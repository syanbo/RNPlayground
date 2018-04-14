/**
 * Author   : Syan
 * Date     : 2018/4/2
 * Project [ RNPlayground ] Coded on WebStorm.
 */
import { types } from 'mobx-state-tree';
const User = types
  .model('User', {
    name: types.string,
    phone: types.number,
    age: types.number
  })
  .actions(self => ({
    updateAge: age => (self.age = age)
  }));

export default User.create({
  name: 'Syan',
  phone: 18652013148,
  age: 25
});
