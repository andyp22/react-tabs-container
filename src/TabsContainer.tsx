import * as ReactTabsContainer from '../react-tabs-container';
import * as React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { TabsFactory } from "./utils/TabsFactory.ts";

/**
 * Container component used to build groups of tabs.
 * 
 * @export
 * @class TabsContainer
 * @extends {React.Component<TCProps, undefined>}
 */
export class TabsContainer extends React.Component<ReactTabsContainer.TCProps, undefined> {
  /**
   * A factory for creating tab panel components.
   * 
   * @type {TabsFactory}
   * @memberof TabsContainer
   */
  tabsFactory: TabsFactory;
  tabMap: Map<number, string>;

  constructor(props: ReactTabsContainer.TCProps) {
    super(props);
    this.tabsFactory = new TabsFactory(props.tabListData);
    this.tabMap = new Map<number, string>();
  }
  /**
   * Render the component. Component life-cycle hook.
   * 
   * @returns 
   * 
   * @memberof TabsContainer
   */
  render() {
    const props = this.props;
    const classes = props.classes
      ? `tabs-container ${props.classes}`
      : "tabs-container";
    return (
      <div className={classes}>
        <Tabs
          defaultIndex={this.getSelectedTab()}
          onSelect={(index: number) => {
            localStorage.setItem(this.getLocalStorageName(), index.toString());
            props.onChange(this.tabMap.get(index));
          }}
        >
          <TabList>
            {this.getTabList()}
          </TabList>
          {this.getTabPanels()}
        </Tabs>
      </div>
    );
  }

  componentDidMount() {
    const tabId: string = this.tabMap.get(this.getSelectedTab());
    if(tabId) {
      this.props.onChange(tabId);
    }
  }

  componentDidUpdate(prevProps: ReactTabsContainer.TCProps) {
    if(this.props.permissions !== prevProps.permissions) {
      this.props.onChange(this.tabMap.get(this.getSelectedTab()));
    }
  }
  /**
   * Get a list of Tab components to display. Uses the 'tabList' and
   * 'permissions' props to filter and create only the panels which
   * can be seen by the current user.
   * 
   * @returns {Tab[]} 
   * 
   * @memberof AdminPageView
   */
  getTabList(): any[] {
    this.tabMap.clear();
    return this.tabsFactory
      .getTabsList(this.props.tabList, this.props.permissions)
      .map((tab: any, index: number) => {
        this.tabMap.set(index, tab.id);
        return (
          <Tab key={index}>
            {tab.name}
          </Tab>
        );
      });
  }
  /**
   * Get a list of TabPanel components to display. Uses the 'tabList'
   * and 'permissions' props to filter and create only the panels which
   * can be seen by the current user.
   * 
   * @returns {TabPanel[]} 
   * 
   * @memberof AdminPageView
   */
  getTabPanels(): any[] {
    return this.tabsFactory
      .getTabsList(this.props.tabList, this.props.permissions)
      .map((tab: any, index: number) => {
        const props = {
          name: tab.name,
          viewType: this.props.viewType,
          permissions: this.props.permissions,
          dataPassThru: this.props.dataPassThru
        };
        return (
          <TabPanel key={index}>
            {tab.component(props)}
          </TabPanel>
        );
      });
  }
  /**
   * Gets the 'defaultTabIndex' from localStorage or returns
   * zero if empty.
   * 
   * @returns {number} 
   * 
   * @memberof AdminPageView
   */
  getSelectedTab(): number {
    const lsValue: number = parseInt(
      localStorage.getItem(this.getLocalStorageName()),
      10
    );
    return !isNaN(lsValue) && lsValue > -1 ? lsValue : 0;
  }
  /**
   * Gets the key for the value used to store tab state in
   * local storage.
   * 
   * @returns {string} 
   * 
   * @memberof TabsContainer
   */
  getLocalStorageName(): string {
    return `${this.props.containerName}_defaultTabIndex`;
  }
}

export default TabsContainer;
