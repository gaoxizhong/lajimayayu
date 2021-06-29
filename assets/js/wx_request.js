const host = 'https://v.ljmyy.com/api' // 将域名保存到一个变量中
class wx_request{
    request (url, method, data, header = {}) {
        wx.showLoading({
            title: '加载中...',
            mask: true,
        });
        return new Promise((resolve,reject) => {
            wx.request({
                url:host + url,
                method:method,
                data:data,
                headers:{
                    'content-type': 'application/json' // 默认值
                },
                success:function(res) {
                    wx.hideLoading()
                    resolve(res.data)
                },
                fail: function (res) {
                    wx.hideLoading()
                    reject(res)
                },
                complete: function () {
                    wx.hideLoading()
                }
                })
            })
        }
    get(obj){
        return this.request(obj.url,'GET',obj.data)
    }
    post (obj) {
        return this.request(obj.url,'POST', obj.data)
    }
}

   
module.exports = new wx_request
// export default {request,get,post,host}
