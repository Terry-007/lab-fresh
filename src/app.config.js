export default {
  pages: [
    'pages/home/home',
    'pages/talk/talk',
    'pages/me/me',
    'pages/brief/brief',
    'pages/fresh/fresh',
    'pages/competition/competition',
    'pages/works/works',
    'pages/member/member',
    'pages/notice/notice',
  ],
  window: {
    backgroundTextStyle: 'light',
    enablePullDownRefresh: true,
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    borderStyle: 'white',
    selectedColor: '#4e73ba',
    list: [
      {
        pagePath: 'pages/home/home',
        text: '主页',
        iconPath: './static/tabbar/index.png',
        selectedIconPath: './static/tabbar/index2.png',
      },
      {
        pagePath: 'pages/talk/talk',
        text: '讨论',
        iconPath: './static/tabbar/talk.png',
        selectedIconPath: './static/tabbar/talk2.png',
      },
      {
        pagePath: 'pages/me/me',
        text: '我',
        iconPath: './static/tabbar/me.png',
        selectedIconPath: './static/tabbar/me2.png',
      }
    ]
  }
}