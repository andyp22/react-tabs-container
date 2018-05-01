
export { TabsContainer } from './src/TabsContainer';
export { TabsFactory } from './src/utils/TabsFactory';
/**
 * Define props for the TabsContainer component.
 * 
 * @export
 * @interface TCProps
 */
export interface TCProps {
  /**
   * Optional classes to append to the parent class list.
   * 
   * @type {string}
   * @memberof TCProps
   */
  readonly classes?: string;
  /**
   * A list of tabs which can be displayed in this container.
   * 
   * @type {string[]}
   * @memberof TCProps
   */
  readonly tabList: string[];
  /**
   * A list of objects used to build the tabs and tab content.
   * 
   * @type {TabListData[]}
   * @memberof TCProps
   */
  readonly tabListData: TabListData[];
  /**
   * A list of user permissions used to filter the tab list.
   * 
   * @type {any[]}
   * @memberof TCProps
   */
  readonly permissions: any[];
  /**
   * The name of the tab container. Used to store the selected state
   * of the container in local storage.
   * 
   * @type {string}
   * @memberof TCProps
   */
  readonly containerName: string;
  /**
   * Type name designating how this tab container is being used.
   * @example 'top-level', 'sub-component', 'tab_name sub-component'
   * 
   * @type {string}
   * @memberof TCProps
   */
  readonly viewType: string;
  /**
   * Data to be passed thru to the tab panel.
   * 
   * @type {*}
   * @memberof TCProps
   */
  readonly dataPassThru: any;
  readonly onChange: any;
}
/**
 * A factory method to create React.Components.
 * 
 * @interface ComponentFunct
 */
export interface ComponentFunct {
  // TODO: Create an interface for the props
  // TODO: Create an interface for the return value
  (props?: any): any;
}

export interface AccessCallbackFunct {
  (tab: TabListData, permissions: any[]): boolean;
}

/**
 * Define data used to render Tabs and TabPanels inside a
 * TabsContainer component.
 * 
 * @export
 * @interface TabListData
 */
export interface TabListData {
  /**
   * The value used as the unique key for this tab.
   * 
   * @type {string}
   * @memberof TabListData
   */
  id: string;
  /**
   * The value used as the label for this tab.
   * 
   * @type {string}
   * @memberof TabListData
   */
  name: string;
  /**
   * The component to render when this tab is selected.
   * 
   * @type {ComponentFunct}
   * @memberof TabListData
   */
  component: ComponentFunct;
  /**
   * The user permissions which can see this tab.
   * 
   * @type {(string[] | number[])}
   * @memberof TabListData
   */
  permissions: any[];
  accessCallback?: AccessCallbackFunct;
}
