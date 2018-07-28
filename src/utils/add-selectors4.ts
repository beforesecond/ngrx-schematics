import { Tree, SchematicsException, Rule, DirEntry } from "@angular-devkit/schematics";
import { ModuleOptions, buildRelativePath } from "../schematics-angular-utils/find-module";
import * as ts from 'typescript';
import { insertImport } from "../schematics-angular-utils/route-utils";
import { getSourceNodes } from "../schematics-angular-utils/ast-utils";
import { Change, InsertChange, NoopChange } from "../schematics-angular-utils/change";
import { constructDestinationPath } from "./find-file";
import { strings, normalize, join } from '@angular-devkit/core';
//import { NgrxOptions } from "../ngrx-schematics/schema";


const classify = strings.classify;
const dasherize = strings.dasherize;
const camelize = strings.camelize;

interface AddInjectionContext {
    appComponentFileName: string;       // e. g. /src/app/app.component.ts
    relativeServiceFileName: string;    // e. g. ./core/side-menu/side-menu.service
    serviceName: string;                // e. g. SideMenuService
}

function findFileByName(file: string, path: string, host: Tree): string {

    let dir: DirEntry | null = host.getDir(path);

    while (dir) {
        let appComponentFileName = dir.path + '/' + file;
        if (host.exists(appComponentFileName)) {
            return appComponentFileName;
        }
        dir = dir.parent;
    }
    throw new SchematicsException(`File ${file} not found in ${path} or one of its anchestors`);
}

function createAddInjectionContext(options: ModuleOptions, host: Tree,name:string): AddInjectionContext {

    let nameRoot = options.name;
    nameRoot = nameRoot.substr(0, nameRoot.indexOf('/'))
   // console.log(nameRoot)

    let appComponentFileName = findFileByName(name + '-selectors.ts', options.path || '/', host);
    let destinationPath = constructDestinationPath(options);
    let serviceName = classify(`${options.name}Selectors`);
    let serviceFileName = join(normalize(destinationPath), `${dasherize(options.name)}`);
    serviceFileName = join(normalize(destinationPath), `${dasherize('')}`);
    let relativeServiceFileName = buildRelativePath(appComponentFileName, serviceFileName);

    return {
        appComponentFileName,
        relativeServiceFileName,
        serviceName
    }
}

export function injectSelectors4IntoAppComponent(options: ModuleOptions, name: string): Rule {
    // console.log('injectServiceIntoAppComponent');
    return (host: Tree) => {

        let context = createAddInjectionContext(options, host, name);

        let changes = buildInjectionChanges(context, host, options);

        const declarationRecorder = host.beginUpdate(context.appComponentFileName);
        for (let change of changes) {
            if (change instanceof InsertChange) {
                declarationRecorder.insertLeft(change.pos, change.toAdd);
            }
        }
        host.commitUpdate(declarationRecorder);

        return host;
    };
};

function buildInjectionChanges(context: AddInjectionContext, host: Tree, options: ModuleOptions): Change[] {

    let text = host.read(context.appComponentFileName);
    if (!text) throw new SchematicsException(`File ${options.module} does not exist.`);
    let sourceText = text.toString('utf-8');

    let sourceFile = ts.createSourceFile(context.appComponentFileName, sourceText, ts.ScriptTarget.Latest, true);
    //console.log(sourceFile)
    let nodes = getSourceNodes(sourceFile);
    let ctorNode = nodes.find(n => n.kind == ts.SyntaxKind.Constructor);

    let constructorChange: Change;

    if (!ctorNode) {
        // No constructor found
        constructorChange = createExportSelectorsForInjection(context, nodes, options);
    }
    else {
        constructorChange = addConstructorArgument(context, ctorNode, options);
    }

    return [
        constructorChange,
        insertImport(sourceFile, context.appComponentFileName, context.serviceName, context.relativeServiceFileName)
    ];

}

function addConstructorArgument(context: AddInjectionContext, ctorNode: ts.Node, options: ModuleOptions): Change {

    if (options) {

    }
    let siblings = ctorNode.getChildren();

    let parameterListNode = siblings.find(n => n.kind === ts.SyntaxKind.SyntaxList);

    if (!parameterListNode) {
        throw new SchematicsException(`expected constructor in ${context.appComponentFileName} to have a parameter list`);
    }

    let parameterNodes = parameterListNode.getChildren();

    let paramNode = parameterNodes.find(p => {
        let typeNode = findSuccessor(p, [ts.SyntaxKind.TypeReference, ts.SyntaxKind.Identifier]);
        if (!typeNode) return false;
        return typeNode.getText() === context.serviceName;
    });

    if (!paramNode && parameterNodes.length == 0) {
        let toAdd = `private ${camelize(context.serviceName)}: ${classify(context.serviceName)}`;
        return new InsertChange(context.appComponentFileName, parameterListNode.pos, toAdd);
    }
    else if (!paramNode && parameterNodes.length > 0) {
        let toAdd = `,
    private ${camelize(context.serviceName)}: ${classify(context.serviceName)}`;
        let lastParameter = parameterNodes[parameterNodes.length - 1];
        return new InsertChange(context.appComponentFileName, lastParameter.end, toAdd);

    }

    return new NoopChange();
}

function findSuccessor(node: ts.Node, searchPath: ts.SyntaxKind[]) {
    let children = node.getChildren();
    let next: ts.Node | undefined = undefined;

    for (let syntaxKind of searchPath) {
        next = children.find(n => n.kind == syntaxKind);
        if (!next) return null;
        children = next.getChildren();
    }
    return next;
}


function createExportSelectorsForInjection(context: AddInjectionContext, nodes: ts.Node[], options: ModuleOptions): Change {
    let classNode = nodes.find(n => n.kind === ts.SyntaxKind.SourceFile);
    if(nodes&&options){

    }
    if (!classNode) {
        throw new SchematicsException(`expected class in ${context.appComponentFileName}`);
    }
    let posintion = classNode.getText().indexOf(`(): any => false,`)+(`(): any => false,`).length+1
    let selectValue = classify(`${options.name}`);
    let toAdd = `
    ${context.serviceName}.select${selectValue}IsLoading,
    `;

    return new InsertChange(context.appComponentFileName, posintion, toAdd);

}

// function showTree(node: ts.Node, depth: number = 0): void {
//     let indent = ''.padEnd(depth*4, ' ');
//     console.log(indent + ts.SyntaxKind[node.kind]);
//     if (node.getChildCount() === 0) {
//         console.log(indent + '    Text: ' + node.getText());
//     }

//     for(let child of node.getChildren()) {
//         showTree(child, depth+1);
//     }
// }