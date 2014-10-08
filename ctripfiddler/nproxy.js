var path = '/Volumes/HDD/TFS/ResStatic/Branches/Code/Vacation_Src/ResVacationOnline/js/vacation/app/src/';
module.exports = [

  // 1. replace single file with local one
  // {
  //   pattern: 'pgk_book_fill.js',      // Match url you wanna replace
  //   responder:  "/Users/jiangfeng/www/git/sync/hou/pgk_book_fill1.js"
  // },
  // {
  //   pattern: 'book.css',      // Match url you wanna replace
  //   responder:  "/Users/jiangfeng/www/git/sync/hou/填写核对页_files/book.css"
  // }
  // ,

  // // 2. replace single file with web file
  // {
  //   pattern: 'homepage.js',      // Match url you wanna replace
  //   responder:  "http://www.anotherwebsite.com/assets/js/homepage2.js"
  // },

  // // 3. replace combo file with src with absolute file path
  // {
  //   pattern: 'search/searchV2.js', 
  //   responder: [
  //     path + 'search/searchV2.js'
  //   ] 
  // }
  // {
  //   pattern: 'search/searchV2.js', 
  //   responder: [
  //     '/Volumes/HDD/TFS/ResStatic/Branches/Code/Vacation_Src/ResVacationOnline/js/vacation/app/src/search/searchV',
  //     '/home/goddyzhao/workspace/webapp/ui/homepage/js/b.js',
  //     '/home/goddyzhao/workspace/webapp/ui/homepage/js/c.js'
  //   ] 
  // }
  // ,

  // // 4. replace combo file with src with relative file path and specified dir
  // {
  //   pattern: 'group/homepageTileFramework.*.js',
  //   responder: {
  //     dir: '/home/goddyzhao/workspace/webapp/ui/homepage/js',
  //     src: [
  //       'a.js',
  //       'b.js',
  //       'c.js'
  //     ]
  //   }
  // }
  // ,

  // // 5. Map server image directory to local image directory
  // {
  //   pattern: 'ui/homepage/img',  // must be a string
  //   responder: '/home/goddyzhao/image/' //must be a absolute directory path
  // },

  // // 6. Write responder with regular expression variables like $1, $2
  {
    pattern: /http?:\/\/webresource.c-ctrip.com\/ResVacationOnline\/R9\/js\/vacation\/app\/min\/search\/(.*)\.(\w+)/,
    responder: '/Volumes/HDD/TFS/ResStatic/Branches/Code/Vacation_Src/ResVacationOnline/js/vacation/app/src/search/$1.$2'
  }
  // {
  //   pattern: /https?:\/\/[\w\.]*(?::\d+)?\/ui\/(.*)_dev\.(\w+)/,
  //   responder: 'http://localhost/proxy/$1.$2'
  // }
  // ,

  // // 7. Map server image directory to local image directory with regular expression
  // // This simple rule can replace multiple directories to corresponding locale ones
  // // For Example, 
  // //   http://host:port/ui/a/img/... => /home/a/image/...
  // //   http://host:port/ui/b/img/... => /home/b/image/...
  // //   http://host:port/ui/c/img/... => /home/c/image/...
  // //   ...
  // {
  //   pattern: /ui\/(.*)\/img\//,
  //   responder: '/home/$1/image/'
  // }
];