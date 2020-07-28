


/**
 * 进行Local数据管理储存的管理工具模块
 * 
 */
const USER_KEY = 'user_key'
const PROID_KEY = 'project_id_key'
const PRONAME_KEY = 'project_name_key'

export default {
    /**
     * 保存user
     */
    saveUser(user) {
        localStorage.setItem(USER_KEY, JSON.stringify(user))
    },
    /**
     * 读取
     */
    getUser() {
        return JSON.parse(localStorage.getItem(USER_KEY) || '{}')
    },
    /**
     * 删除
     */
    removeUser() {
        localStorage.removeItem(USER_KEY)
    },


    saveProjectId(user) {

        localStorage.setItem(PROID_KEY, JSON.stringify(user))
    },
    /**
     * 读取
     */
    getProjectId() {
        
        
        return localStorage.getItem(PROID_KEY);
    },
    saveProjectName(user) {

        localStorage.setItem(PRONAME_KEY, user)
    },

    /**
     * 读取
     */
    getProjectName() {
       
        
        return localStorage.getItem(PRONAME_KEY);
    },
    /**
     * 存储环境
     */
    saveEnvironment(a){
        localStorage.setItem("Environment", JSON.stringify(a))
        console.log(localStorage.getItem("Environment"))
    },
    /**
     * 获取环境
     */
    getEnvironment(){
        return JSON.parse(localStorage.getItem("Environment") || '{}')
    },
    /**
     * 存储设备列表
     */
    savaDeviceList(a){
        localStorage.setItem('DeviceList',JSON.stringify(a))
    },
    /**
     * 获取设备列表
     */
    getDeviceList(){
        return JSON.parse(localStorage.getItem("DeviceList") || '{}')
    },

    /**
     * 存储数据
     */
    saveData(key,value){    
        if(typeof(value) === "object"){
            localStorage.setItem(key,JSON.stringify(value))
        }else{
            localStorage.setItem(key,value)
        }
    },
    /**
     * 获取数据
     */
    getData(key){  
    let value = localStorage.getItem(key);
    if(value){
        if(value.indexOf("[")!==-1 || value.indexOf('{')!==-1){
            console.log(value)
            return JSON.parse(value);
    
         }else{
             return value;
         }      
    }
    
    },

    /**
     * 删除数据
     */
    removeData(key){
        localStorage.removeItem(key)
    }
  
}