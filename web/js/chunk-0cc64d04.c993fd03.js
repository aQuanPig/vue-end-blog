(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0cc64d04"],{"22db":function(e,t,n){"use strict";n.r(t);var s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("transition",{attrs:{name:"component-fade",mode:"out-in"}},[e.$store.state.isShow?n("login"):n("register")],1)},a=[],i=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"container"},[s("img",{staticClass:"bg",attrs:{src:n("b43d"),alt:""}}),s("div",{staticClass:"panel display-flex"},[s("div",{staticClass:"panel-left panel-left-none flex"},[s("div",{staticClass:"input"},[s("h2",{staticStyle:{color:"#6f5555","margin-bottom":"10px"}},[e._v("Sign in")]),s("div",{staticClass:"input-item"},[s("i",{staticClass:"iconfont icon-yonghuming"}),s("input",{directives:[{name:"model",rawName:"v-model",value:e.model.username,expression:"model.username"}],attrs:{type:"text",placeholder:"请输入用户名..."},domProps:{value:e.model.username},on:{input:function(t){t.target.composing||e.$set(e.model,"username",t.target.value)}}})]),s("div",{staticClass:"input-item"},[s("i",{staticClass:"iconfont icon-huabanfuben"}),s("input",{directives:[{name:"model",rawName:"v-model",value:e.model.password,expression:"model.password"}],attrs:{type:"password",placeholder:"请输入密码..."},domProps:{value:e.model.password},on:{input:function(t){t.target.composing||e.$set(e.model,"password",t.target.value)}}})])]),s("button",{staticClass:"btn",on:{click:e.loginUser}},[e._v("登录")])]),s("div",{staticClass:"panel-right panel-right-none flex"},[s("h1",{staticStyle:{"margin-top":"50%"}},[e._v("Hello Friend!")]),s("p",[e._v("欢迎来到我的博客！")]),s("button",{staticClass:"register",on:{click:e.changeClick}},[e._v("注册")])])])])},o=[],r=(n("96cf"),n("1da1")),c=n("9fb0"),l=n("8d85"),u={name:"Login",data:function(){return{model:{username:"",password:""}}},methods:{loginUser:function(){var e=this;return Object(r["a"])(regeneratorRuntime.mark((function t(){var n,s,a,i,o,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(l["b"])(e.model);case 2:n=t.sent,200===n.status&&e.$Message["success"]({background:!0,content:"登录成功,即将跳转"}),s=n.data,a=s._id,i=s.nickname,o=s.avatar,r={_id:a,nickname:i,avatar:o},console.log(r),sessionStorage.setItem("usertoken",n.data.token),sessionStorage.setItem("userinfo",JSON.stringify(r)),e.$store.commit(c["b"],r),e.$router.push("/");case 11:case"end":return t.stop()}}),t)})))()},changeClick:function(){this.$store.commit(c["f"])}}},d=u,m=(n("fe3c"),n("2877")),p=Object(m["a"])(d,i,o,!1,null,"31e35bf4",null),f=p.exports,g=n("e960"),v={name:"MainLogin",components:{Login:f,Register:g["default"]}},b=v,h=(n("796f"),Object(m["a"])(b,s,a,!1,null,"6955c8d5",null));t["default"]=h.exports},"6bf6":function(e,t,n){},7907:function(e,t,n){},"796f":function(e,t,n){"use strict";var s=n("7907"),a=n.n(s);a.a},fe3c:function(e,t,n){"use strict";var s=n("6bf6"),a=n.n(s);a.a}}]);
//# sourceMappingURL=chunk-0cc64d04.c993fd03.js.map