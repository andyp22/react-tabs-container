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
   * @type {string[]}
   * @memberof TabListData
   */
  permissions: string[];
}

/**
 * A factory class used to create components that are displayed as the
 * panel for a tab.
 * 
 * @export
 * @class TabsFactory
 */
export class TabsFactory {
  constructor(private tablistData: TabListData[]) {}
  /**
   * Get a list of data used to render tab panel components.
   * 
   * @param {string[]} tabs - A list of tabs that will be used to populate a component.
   * @param {string[]} permissions - A list of user permissions which is used to filter out tabs which
   * the user can not access.
   * @returns {TabListData[]} 
   * 
   * @memberof TabsFactory
   */
  getTabsList(tabs: string[], permissions: string[]): TabListData[] {
    const tabsData = this.tablistData
      .filter((tabData: TabListData) => {
        if (
          tabs.find(tab => {
            return tab === tabData.id || tab === 'all';
          })
        ) {
          return true;
        }
        return false;
      })
      .filter((tabData: TabListData) => {
        return this.filterByRoleName(tabData, permissions);
      }, this);

    const returnTabs: TabListData[] = [];
    tabs.forEach((id: string) => {
      tabsData.forEach(tabData => {
        if (id === tabData.id) {
          returnTabs.push(tabData);
        }
      }, this);
    }, this);

    return returnTabs;
  }
  /**
   * Filter a tab by the permissions assigned to the user. If the permissions are
   * left empty then all tabs requested will be returned.
   * 
   * @param {TabListData} tab 
   * @param {(string | string[])} permissions 
   * @returns {boolean} 
   * 
   * @memberof TabsFactory
   */
  filterByRoleName(tab: TabListData, permissions?: string | string[]): boolean {
    if (!permissions) return true;

    let has_permission: boolean = false;
    const perms: string[] =
      typeof permissions === "string" ? [permissions] : permissions;
    perms.forEach((permission: string) => {
      if (tab.permissions.indexOf(permission) > -1) {
        has_permission = true;
      }
    }, this);

    return has_permission;
  }
}

export default TabsFactory;
