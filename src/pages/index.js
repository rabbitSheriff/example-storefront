import React, { Component } from "react";
import PropTypes from "prop-types";
import { observer, inject } from "mobx-react";
import Helmet from "react-helmet";

import withData from "lib/apollo/withData";
import withCatalogItems from "containers/catalog/withCatalogItems";
import withRoot from "lib/theme/withRoot";
import withShop from "containers/shop/withShop";
import Layout from "components/Layout";
import ProductGrid from "components/ProductGrid";

@withData
@withRoot
@withShop
@withCatalogItems
@inject("shop")
@inject("routingStore")
@inject("uiStore")
@observer
class Shop extends Component {
  static propTypes = {
    catalogItems: PropTypes.array.isRequired,
    catalogItemsPageInfo: PropTypes.object,
    routingStore: PropTypes.object,
    shop: PropTypes.object,
    uiStore: PropTypes.object.isRequired
  };

  renderHelmet() {
    const { shop } = this.props;

    return (
      <Helmet>
        <title>{shop && shop.name}</title>
        <meta name="description" content={shop && shop.description} />
      </Helmet>
    );
  }

  setPageSize = (pageSize) => {
    this.props.routingStore.setSearch(`limit=${pageSize}`);
    this.props.uiStore.setPageSize(pageSize);
  }

  render() {
    const { catalogItems, catalogItemsPageInfo, uiStore } = this.props;

    return (
      <Layout title="Reaction Shop">
        {this.renderHelmet()}
        <ProductGrid
          catalogItems={catalogItems}
          pageInfo={catalogItemsPageInfo}
          pageSize={uiStore.pageSize}
          setPageSize={this.setPageSize}
        />
      </Layout>
    );
  }
}

export default Shop;
