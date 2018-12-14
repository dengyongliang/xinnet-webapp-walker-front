"use strict"
const REGISTRANT_ID_TYPE_I = {
  SFZ: "身份证",
  HZ: "护照",
  TXZ: "港澳居民来往内地通行证",
  TWSFZ: "台湾居民来往大陆通行证",
  GWSFZ: "外国人永久居留身份证"
}
const REGISTRANT_ID_TYPE_E = {
  ORG: "组织机构代码证",
  YYZZ: "工商营业执照",
  TYDMZ: "统一社会信用代码证书",
  BDDH: "部队代号",
  JDXKZ: "军队单位对外有偿服务许可证",
  SYZS: "事业单位法人证书",
  GWCZDJZ: "外国企业常驻代表机构登记证",
  STDJZ: "社会团体法人登记证书",
  ZJDJZ: "宗教活动场所登记证",
  MBDJZ: "民办非企业单位登记证书",
  JJDJZ: "基金会法人登记证书",
  LSXKZ: "律师事务所执业许可证",
  GWZHDJZ: "外国在华文化中心登记证",
  GWLYDJZ: "外国政府旅游部门常驻代表机构批准登记证",
  SFXKZ: "司法鉴定许可证",
  GWJGZJ: "外国机构证件",
  SHFWJGZ: "社会服务机构登记证书",
  MBXXXKZ: "民办学校办学许可证",
  YLJGXKZ: "医疗机构执业许可证"
}
const DOMAIN_TRANSFER_STATUS = {
  1: "待转移",
  2: "转移中",
  3: "转移成功",
  4: "转移失败",
  5: "转移成功信息更新中",
  6: "转移成功信息更新完成",
  7: "转移成功信息更新失败"
}

export default
{
  REGISTRANT_ID_TYPE_I,
  REGISTRANT_ID_TYPE_E,
  DOMAIN_TRANSFER_STATUS
}