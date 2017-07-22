# react-tabs-container
A helper component for rendering tabs using the [react-tabs](https://www.npmjs.com/package/react-tabs) package.

## Installation
Using npm:
```bash
npm install --save react-tabs-container
```

## Usage
react-tabs-container is just a wrapper component with a factory to create TabPanels on the fly. To use this component, first thing:

```javascript
import { TabsContainer, TCProps, TabListData } from "react-tabs-container";
```

You need a list of objects representing the data needed to build each tab and its content:

```javascript
export const tabListData: TabListData[] = [
  {
    id: "tab1",
    name: "The first tab",
    component: props => {
      return <TabContent1 {...props} />;
    },
    permissions: ["all", "tab1"]
  },
  {
    id: "tab2",
    name: "Tab the second",
    component: props => {
      return <TabContent2 {...props} />;
    },
    permissions: ["tab2"]
  },
  {
    id: "tab3",
    name: "A Third",
    component: props => {
      return <TabContent3 {...props} />;
    },
    permissions: ["tab3"]
  },
  {
    id: "tab4",
    name: "Finally the fourth",
    component: props => {
      return <TabContent4 {...props} />;
    },
    permissions: ["tab1", "tab4"]
  }
}
```

Then in your render function:

```javascript
render() {
  const props: TCProps = {
    tabList: [ "tab1", "tab2", "tab3", "tab4" ],
    tabListData,
    permissions: [ "tab1", "tab2" ],
    containerName: "admin-page-view",
    classes: "admin-page-view-tabs",
    viewType: "top-level",
    dataPassThru: { storeId: this.props.storeId }
  };
  return (
    <div className="admin-page page">
      <TabsContainer {...props} />
    </div>
  );
}
```

### Styling
There are no styles loaded by default. See [react-tabs](https://www.npmjs.com/package/react-tabs#styling) for instructions on using the styles included.

## License
MIT

## Status

This is very much a work in progress. Currenly at:
- [X] Component works as expected
- [ ] API Locked
- [ ] Documentation
- [ ] Examples
- [ ] Tests

More to come.