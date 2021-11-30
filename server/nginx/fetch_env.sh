###
 # @Description: fetch env
 # @Author: 王占领
 # @Date: 2021-11-11 10:01:00
 # @LastEditTime: 2021-11-11 12:15:38
 # @LastEditors: 王占领
 # @FilePath: \web-ccs\server\nginx\fetch_env.sh
### 

sed -i "s/gateway_url/$GATEWAY_URL/g" /etc/nginx/nginx.conf

cat /etc/nginx/nginx.conf