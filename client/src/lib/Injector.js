/**
 * Using this to map field types to components until we implement dependency injection.
 */
class Injector {

  constructor() {
    // Components registered with the fake DI container.
    this.components = {};
  }

  /**
   * Gets the component matching the passed component name.
   * Used when a component type is provided bt the form schema.
   *
   * @param {String} componentName - The name of the component to get from the injector.
   * @return object|null
   */
  getComponentByName(componentName) {
    if (typeof this.components[componentName] === 'undefined') {
      throw new Error(`Unknown component ${componentName}`);
    }
    return this.components[componentName];
  }

  /**
   * Default data type to component mappings.
   * Used as a fallback when no component type is provided in the form schema.
   *
   * @param string dataType - The data type provided by the form schema.
   * @return object|null
   */
  getComponentByDataType(dataType) {
    switch (dataType) {
      case 'String':
      case 'Text':
        return this.components.TextField;
      case 'Date':
        return this.components.DateField;
      case 'Time':
        return this.components.TimeField;
      case 'Datetime':
        return this.components.DatetimeField;
      case 'Hidden':
        return this.components.HiddenField;
      case 'SingleSelect':
        return this.components.SingleSelectField;
      case 'Custom':
        return this.components.GridField;
      case 'Structural':
        return this.components.CompositeField;
      case 'Boolean':
        return this.components.CheckboxField;
      case 'MultiSelect':
        return this.components.CheckboxSetField;
      default:
        return null;
    }
  }

  /**
   * @param  {String} name
   * @param  {Object} component
   */
  register(name, component) {
    this.components[name] = component;
  }
}

// TODO Fix registration across modules, see lib/Router.js for details
window.ss = window.ss || {};
window.ss.injector = window.ss.injector || new Injector();

export default window.ss.injector;
