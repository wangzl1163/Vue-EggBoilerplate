/*
 * @Description: nginx fetch env js
 * @Author: 王占领
 * @Date: 2021-11-10 11:26:09
 * @LastEditTime: 2021-11-16 17:28:28
 * @LastEditors: 王占领
 * @FilePath: \web-ccs\server\nginx\config\fetch_env.js
 */

// 获取后端网关地址
function fetch_gateway_url() {
	return process.env.GATEWAY_URL;
}
 

export default fetch_gateway_url