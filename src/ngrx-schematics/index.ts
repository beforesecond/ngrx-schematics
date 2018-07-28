import { chain, mergeWith } from '@angular-devkit/schematics';
import { NgrxOptions } from './schema';
import { apply, filter, move, Rule, template, url, branchAndMerge, Tree, SchematicContext } from '@angular-devkit/schematics';
import { strings } from '@angular-devkit/core';
import { addImportToNgModule } from '../utils/ng-module-utils';
import { findModuleFromOptions } from '../schematics-angular-utils/find-module';
import { injectServiceIntoAppComponent } from '../utils/add-state';
import { injectSelectorsIntoAppComponent } from '../utils/add-selectors';
import { injectSelectors2IntoAppComponent } from '../utils/add-selectors2';
import { injectSelectors3IntoAppComponent } from '../utils/add-selectors3';
import { injectSelectors4IntoAppComponent } from '../utils/add-selectors4';
import { injectSelectors5IntoAppComponent } from '../utils/add-selectors5';
import { injectSelectors6IntoAppComponent } from '../utils/add-selectors6';
import { injectIndexIntoAppComponent} from '../utils/add-index';

import { getWorkspace } from '../schematics-angular-utils/config';
import { parseName } from '../utils/parse-name';


function filterTemplates(options: NgrxOptions): Rule {
  if (!options.ngrxService) {
  }
  // console.log(filter(path => !path.match(/\.actions\.ts$/) && !path.match(/\.effects\.ts$/)
  // && !path.match(/\.index\.ts$/) && !path.match(/\.reducer\.ts$/) && !path.match(/\.selectors\.ts$/)
  // && !path.match(/\.state\.ts$/) ))
  
   // return filter(path => !path.match(/\.actions\.ts$/));
  //}
  return filter(path => !path.match(/\.bak$/));
}

export default function (options: NgrxOptions): Rule {

    return (host: Tree, context: SchematicContext) => {

      let nameRoot = options.name;
      //console.log('options', nameRoot.substr(0,nameRoot.indexOf('/')));
      options.rootStore = nameRoot.substr(0,nameRoot.indexOf('/'))
      const workspace = getWorkspace(host);
      if (!options.project) {
        options.project = Object.keys(workspace.projects)[0];
      }
      const project = workspace.projects[options.project];

      if (options.path === undefined) {
        const projectDirName = project.projectType === 'application' ? 'app' : 'lib';
        options.path = `/${project.root}/src/${projectDirName}`;
      }
      //options
      options.module = findModuleFromOptions(host, options);

      const parsedPath = parseName(options.path, options.name);
      options.name = parsedPath.name;
      options.path = parsedPath.path;

      //console.log('options', options);

      const templateSource = apply(url('./files'), [
        filterTemplates(options),
        template({
          ...strings,
          ...options
        }),
        () => { 
          //console.debug('pathfiles', parsedPath.path )
        },
        move(parsedPath.path)
      ]);

      const rule = chain([
        branchAndMerge(chain([
          mergeWith(templateSource),

          addImportToNgModule(options, options.export), 
       //   addDeclarationToNgModule(options, options.export),
          injectServiceIntoAppComponent(options,options.rootStore),
          injectIndexIntoAppComponent(options,options.rootStore),
          injectSelectorsIntoAppComponent(options,options.rootStore),
          injectSelectors2IntoAppComponent(options,options.rootStore),
          injectSelectors3IntoAppComponent(options,options.rootStore),
          injectSelectors4IntoAppComponent(options,options.rootStore),
          injectSelectors5IntoAppComponent(options,options.rootStore),
          injectSelectors6IntoAppComponent(options,options.rootStore),
          
        ]))
      ]);

      return rule(host, context);
    }
}

