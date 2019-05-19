export default (routers, menus, powers) => {
  generaMenu(routers, menus, powers)
}
function generaMenu (routers, menus, powers) {
  menus.forEach((item) => {
    let menu = Object.assign({}, item)
    if (powers.indexOf(menu.meta.powers) >= 0 && menu.children && menu.children.length > 0) {
      menu.children = []
      generaMenu(menu.children, item.children, powers)
    }
    routers.push(menu)
  })
}
