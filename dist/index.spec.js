"use strict";

var _ = require("./");

describe('test base has each object defined', () => {
  test('account not undef', () => {
    expect(_.account).not.toBe(undefined);
  });
  test('connection not undef', () => {
    expect(_.connection).not.toBe(undefined);
  });
  test('data not undef', () => {
    expect(_.data).not.toBe(undefined);
  });
  test('processing not undef', () => {
    expect(_.processing).not.toBe(undefined);
  });
  test('user not undef', () => {
    expect(_.user).not.toBe(undefined);
  });
  test('version not undef', () => {
    expect(_.version).not.toBe(undefined);
  });
});