/**
 * A factory class used to create components that are displayed as the
 * panel for a tab.
 * 
 * @export
 * @class TabsFactory
 */
export class TabsFactory {
  constructor(private tablistData: TabListData[]) { }
  /**
   * Get a list of data used to render tab panel components.
   * 
   * @param {string[]} tabs - A list of tabs that will be used to populate a component.
   * @param {(string[] | number[])} permissions - A list of user permissions which is used to filter out tabs
   * the user can not access.
   * @returns {TabListData[]} 
   * 
   * @memberof TabsFactory
   */
  getTabsList(tabs: string[], permissions: string[] | number[]): TabListData[] {
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
   * @param {any[]} permissions 
   * @returns {boolean} 
   * 
   * @memberof TabsFactory
   */
  filterByRoleName(tab: TabListData, permissions?: any[]): boolean {
    if (!permissions) return true;
    
    if(tab.accessCallback) {
      return tab.accessCallback(tab, permissions);
    }

    let has_permission: boolean = false;
    permissions.forEach((permission) => {
      if (tab.permissions.indexOf(permission) > -1) {
        has_permission = true;
      }
    }, this);

    return has_permission;
  }
}

export default TabsFactory;
