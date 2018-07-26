import * as <%= classify(name) %>StoreActions from './actions';
import * as <%= classify(name) %>StoreSelectors from './selectors';
import * as <%= classify(name) %>StoreState from './state';

export { <%= classify(name) %>StoreModule } from './<%=dasherize(name)%>-store.module';

export {
    <%= classify(name) %>StoreActions,
    <%= classify(name) %>StoreSelectors,
    <%= classify(name) %>StoreState
};