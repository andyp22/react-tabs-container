import * as React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { TabsFactory, TabListData } from "./utils/TabsFactory.ts";
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
   * @type {string[]}
   * @memberof TCProps
   */
  readonly permissions: string[];
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
}

/**
 * Container component used to build groups of tabs.
 * 
 * @export
 * @class TabsContainer
 * @extends {React.Component<TCProps, undefined>}
 */
export class TabsContainer extends React.Component<TCProps, undefined> {
  /**
   * A factory for creating tab panel components.
   * 
   * @type {TabsFactory}
   * @memberof TabsContainer
   */
  tabsFactory: TabsFactory;

  constructor(props: TCProps) {
    super(props);
    this.tabsFactory = new TabsFactory(props.tabListData);
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
    return this.tabsFactory
      .getTabsList(this.props.tabList, this.props.permissions)
      .map((tab: any, index: number) => {
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
}

export default TabsContainer;
