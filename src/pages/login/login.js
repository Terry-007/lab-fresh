import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { AtButton, AtInput, AtMessage } from 'taro-ui'
import React from 'react'
import './login.scss'
import {AppContext} from '@/context'
import { URL} from '@/url'

export default class Login extends React.Component {
  static contextType = AppContext

  state = {
    studentNum: '04172088',
    password: '04172088'
  }

   //提交表单
  register = () => {
    const { studentNum, password } = this.state
    let obj = {
      studentNum, 
      password, 
    }
    //表单校验
    for(let key in obj){
      let bool = tools.checkEmpty(obj[key])
      if(!bool){
        tools.popTip('表单信息都是必填项', 'warning')
        return
      }
    }
    if(obj.studentNum.length !== 8){
      tools.popTip('学号必须是8位', 'error')
      return
    }
    if(obj.password.length < 8){
      tools.popTip('密码至少8位', 'error')
      return
    }

    Taro.request({
      url: URL.register,
      method: 'POST',
      data: obj,
      success: (res) => {
        const {status, errmsg, avaterUrl, level} = res.data
        switch(status){
          case 1: 
            tools.popTip(errmsg, 'error')
            break
          case 2:
            tools.popTip(errmsg, 'warning')
            break
          case 3:
            tools.popTip(errmsg, 'success')
            //设置全局变量
            this.loginNext(studentNum, level, avaterUrl)
        }
        console.log(res.data)
      }
    })
  }

  doLogin = () => {
    const {studentNum, password} = this.state
    let obj = {
      studentNum, 
      password
    }

    for(let key in obj){
      let bool = tools.checkEmpty(obj[key])
      if(!bool){
        tools.popTip('表单信息都是必填项', 'warning')
        return
      }
    }

    Taro.request({
      url: URL.doLogin,
      method: 'POST',
      data: obj,
      success: (res) => {
        const {status, errmsg, level, avaterUrl} = res.data
        console.log(res.data)
        switch(status){
          case 1: 
            tools.popTip(errmsg, 'error')
            break
          case 2:
            tools.popTip(errmsg, 'warning')
            break
          case 3:
            tools.popTip(errmsg, 'error')
            break
          case 4:
            tools.popTip(errmsg, 'success')
            this.loginNext(studentNum, level, avaterUrl)
        }
      }
    })
  }

  //设置全局变量和请求用户信息，跳转
  loginNext = (studentNum, level, avaterUrl) => {
    const {updateState} = this.context

    updateState('studentNum', studentNum)
    updateState('level', level)
    updateState('avaterUrl', avaterUrl)

    //请求登陆用户的信息
    Taro.request({
      url: `${URL.info}?studentNum=${studentNum}`,
      success(res){
        const {status, userInfo} = res.data
        if(status){
          updateState('userInfo', userInfo)

          //跳转
          setTimeout(() => Taro.switchTab({
            url: `/pages/home/home`
          }), 1000)
        }
      }
    })
  }

  changeInput = (val, e) => {
    let key = e.mpEvent.target.id
    this.setState({
      [key]: val
    })
  }

  render(){
    const {studentNum, password} = this.state
    return (
      <View className='login'>
        <AtMessage />
        <View className='login_input'>
          <AtInput
            name='studentNum'
            required
            title='学号'
            type='text'
            placeholder='请输入8位学号'
            value={studentNum}
            onChange={this.changeInput}
          />
          <AtInput
            name='password'
            required
            title='密码'
            type='password'
            placeholder='请输入至少8位密码'
            value={password}
            onChange={this.changeInput}
          />
        </View>
        <AtButton type='primary' onClick={this.register}>点击注册</AtButton>
        <AtButton type='primary' onClick={this.doLogin}>点击登陆</AtButton>
      </View>
    )
  }
}

var tools = {
  //校验是否为空
  checkEmpty(key){
    if(key){
      return true
    }
    return false
  }, 
  //提示框
  popTip(message, type){
    Taro.atMessage({
      message,
      type,
    })
  },
}