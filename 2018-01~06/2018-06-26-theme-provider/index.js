import ThemeProvider from './theme';

@ThemeProvider(require('./style.less'), 'name')
class App {

  test() {
    console.log('hello ')
    console.log(this.name)
    console.log(this.name.helloWorld);
  }
}

new App().test()



