"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

/**
 * 进行Local数据管理储存的管理工具模块
 * 
 */
var USER_KEY = 'user_key';
var PROID_KEY = 'project_id_key';
var _default = {
  /**
   * 保存user
   */
  saveUser: function saveUser(user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  /**
   * 读取
   */
  getUser: function getUser() {
    return JSON.parse(localStorage.getItem(USER_KEY) || '{}');
  },

  /**
   * 删除
   */
  removeUser: function removeUser() {
    localStorage.removeItem(USER_KEY);
  },
  saveProjectId: function saveProjectId(user) {
    localStorage.setItem(PROID_KEY, user);
  },

  /**
   * 读取
   */
  getProjectId: function getProjectId() {
    var a = localStorage.getItem(PROID_KEY);
    return localStorage.getItem(PROID_KEY);
  } // /**
  //  * 删除
  //  */
  // removeProjectId() {
  //     localStorage.removeItem(PROID_KEY)
  // }

};
exports["default"] = _default;