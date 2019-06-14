import menus from '@/router/routers.js'
// import LazyLoading from '@/global/lazyLoading'
export default (routers, permission) => {
  generaMenu(routers, menus, permission)
}
function generaMenu (routers, menus, permission) {
  menus.forEach((item) => {
    let menu = Object.assign({}, item)
    console.log(menu.meta.permission)
    if (menu.meta.permission === 'root' || (menu.children && menu.children.length > 0)) {
      if (permission.indexOf(menu.meta.permission) >= 0) {
        // menu.redirect = '/noAuth'
        menu.meta.show = true
      }
      menu.children = []
      generaMenu(menu.children, item.children, permission)
    }
    if (menu.meta.permission === 'root' || permission.indexOf(menu.meta.permission) >= 0) {
      menu.meta.show = true
      routers.push(menu)
    } else {
      console.log(menu.meta.permission)
      // menu.redirect = '/noAuth'
      // menu.meta.show = false
      routers.push(menu)
    }
  })
}
