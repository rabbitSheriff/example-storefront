import React, { Component } from "react";
import PropTypes from "prop-types";
import Grid from "material-ui/Grid";
import { withStyles } from "material-ui/styles";
import { observable, action, computed } from "mobx";
import { observer } from "mobx-react";
import ProductDetailOption from "components/ProductDetailOption";

const styles = (theme) => ({
  root: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit
  }
});

@observer
@withStyles(styles, { withTheme: true })
export default class OptionsList extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    options: PropTypes.arrayOf(PropTypes.object),
    theme: PropTypes.object
  }

  @observable _selectedOption = null;

  @computed
  get selectedOption() {
    return this._selectedOption;
  }

  set selectedOption(value) {
    this._selectedOption = value;
  }

  @action
  selectOption = (option) => {
    this.selectedOption = option._id;
    this.forceUpdate();
  }

  render() {
    const { classes: { root }, options, theme } = this.props;

    if (!Array.isArray(options)) return null;

    return (
      <Grid container className={root} spacing={theme.spacing.unit}>
        {options.map((option) => (
          <Grid item key={option._id}>
            <ProductDetailOption
              onClick={this.selectOption}
              selectedOption={this.selectedOption}
              option={option}
            />
          </Grid>
        ))
        }
      </Grid>
    );
  }
}
