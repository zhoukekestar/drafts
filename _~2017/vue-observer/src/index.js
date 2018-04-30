import {
  Observer,
  observe,
  set as setProp,
  del as delProp
} from './observer/index'
import Dep from './observer/dep'
import { hasOwn } from './util/index'

describe('Observer', function() {
  it('observing set/delete', () => {
    const obj1 = { a: 1 }
    const ob1 = observe(obj1)
    const dep1 = ob1.dep
    spyOn(dep1, 'notify')
    setProp(obj1, 'b', 2)
    expect(obj1.b).toBe(2)
    expect(dep1.notify.calls.count()).toBe(1)
    delProp(obj1, 'a')
    expect(hasOwn(obj1, 'a')).toBe(false)
    expect(dep1.notify.calls.count()).toBe(2)
    // set existing key, should be a plain set and not
    // trigger own ob's notify
    setProp(obj1, 'b', 3)
    expect(obj1.b).toBe(3)
    expect(dep1.notify.calls.count()).toBe(2)
    // set non-existing key
    setProp(obj1, 'c', 1)
    expect(obj1.c).toBe(1)
    expect(dep1.notify.calls.count()).toBe(3)
    // should ignore deleting non-existing key
    delProp(obj1, 'a')
    expect(dep1.notify.calls.count()).toBe(3)
    // should work on non-observed objects
    const obj2 = { a: 1 }
    delProp(obj2, 'a')
    expect(hasOwn(obj2, 'a')).toBe(false)
    // should work on Object.create(null)
    const obj3 = Object.create(null)
    obj3.a = 1
    const ob3 = observe(obj3)
    const dep3 = ob3.dep
    spyOn(dep3, 'notify')
    setProp(obj3, 'b', 2)
    expect(obj3.b).toBe(2)
    expect(dep3.notify.calls.count()).toBe(1)
    delProp(obj3, 'a')
    expect(hasOwn(obj3, 'a')).toBe(false)
    expect(dep3.notify.calls.count()).toBe(2)
    // set and delete non-numeric key on array
    const arr2 = ['a']
    const ob2 = observe(arr2)
    const dep2 = ob2.dep
    spyOn(dep2, 'notify')
    setProp(arr2, 'b', 2)
    expect(arr2.b).toBe(2)
    expect(dep2.notify.calls.count()).toBe(1)
    delProp(arr2, 'b')
    expect(hasOwn(arr2, 'b')).toBe(false)
    expect(dep2.notify.calls.count()).toBe(2)
  })
});