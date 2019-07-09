'use strict';

const allItems = loadAllItems();

const title = "***<没钱赚商店>收据***";
const upDelimeter = "----------------------";
const priceText = "总计：";
const downDelimeter = "**********************";

function scanBarcodes(barcodes){
  let scanResult = [];
  let map = new Map();
  for(let i = 0; i < barcodes.length; i++){
      if(map.has(barcodes[i])){
          map.set(barcodes[i], map.get(barcodes[i]) + 1);
      }else{
          map.set(barcodes[i], 1);
      }
  }
  map.forEach((value, key, map) => {
      scanResult.push({barcode: key, count: value});
  });
  return scanResult;
}

function findRelatedGoods(scanResult){
  let relatedGoods = [];
  scanResult.forEach(item => {
      for(let i = 0; i < allItems.length; i++){
          if(item.barcode === allItems[i].barcode){
              let temp = allItems[i];
              temp.count = item.count;
              relatedGoods.push(temp);
          }
      }
  });
  return relatedGoods;
}

function createReceipt(relatedGoods){
  let receiptStr = title + '\n';
  let total = 0;
  for(let i = 0; i < relatedGoods.length; i++){
      receiptStr += '名称：' + relatedGoods[i].name + '，数量：' + relatedGoods[i].count + relatedGoods[i].unit+ '，单价：' + relatedGoods[i].price.toFixed(2) + '(元)，小计：' + (relatedGoods[i].price * relatedGoods[i].count).toFixed(2) + '(元)\n';
      total += relatedGoods[i].price * relatedGoods[i].count;
  }
  receiptStr += upDelimeter + '\n' + priceText + total.toFixed(2) + '(元)\n' + downDelimeter ;
  return receiptStr;
}

function printReceipt(barcodes) {
  let scanResult = scanBarcodes(barcodes);
  let relatedGoods = findRelatedGoods(scanResult);
  console.log(createReceipt(relatedGoods));
}
