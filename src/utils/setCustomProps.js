/**
 * Author   : Syan
 * Date     : 2020/8/6
 * Project [ RNPlayground ] Coded on WebStorm.
 */

/**
 * 设置组件的的自定义属性
 * @param WrapComponent 组件
 * @param customProps 默认属性
 */
const setCustomProps = (WrapComponent, customProps) => {
  const ComponentRender = WrapComponent.render;
  const componentDefaultProps = WrapComponent.defaultProps;
  WrapComponent.defaultProps = {
    ...componentDefaultProps,
    ...customProps,
  };
  WrapComponent.render = function render(props) {
    const oldProps = props;
    props = {...props, style: [customProps.style, props.style]};
    try {
      return ComponentRender.apply(this, arguments);
    } finally {
      props = oldProps;
    }
  };
};

export default setCustomProps;
