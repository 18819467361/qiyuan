const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-')
  //  + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}


// 显示繁忙提示
var showBusy = text => wx.showToast({
    title: text,
    icon: 'loading',
    duration: 10000
})

// 显示成功提示
var showSuccess = text => wx.showToast({
    title: text,
    icon: 'success'
})

// 显示失败提示
var showModel = (title, content) => {
    wx.hideToast();
    wx.showModal({
        title,
        content: JSON.stringify(content),
        showCancel: false
    })
}

var validateForm =(fromData) => {
  if(fromData.cost==''){
    return '请填写金额！'
  } else if(fromData.kind==''){
    return '请填写项目！'
  } else if(fromData.time==''){
    return '请填写时间！'
  } else if(fromData.location==''){
    return '请填写地点！'
  } else if(fromData.name==''){
    return '请填写报销人！'
  } 
  return true
}
var surplus = (total,listItem) => {
  let totalCost = 0;
  let balance = 0;
  listItem.forEach((item,index) => {
    totalCost += Number(item.cost);
  })
  balance = total - totalCost;
  return parseInt(balance) 
}
//分类哥葛和宝贝的报销，返回一个对象
var sortList = (costList) => {
  let GGCostList = [];
  let MMCostList = [];
  costList.forEach((item) => {
    if(item.name == '哥葛'){
      GGCostList.push(item);
    } else {
      MMCostList.push(item);
    }
  })
  return {
    GGCostList,
    MMCostList
  } 
}

var totalCost = (costList) => {
  let sum = 0;
  costList.forEach((item) => {
    sum += Number(item.sum);
  })
  return sum;
} 

var sortByMonth = (costList) => {
  let ret = [
    {
      dateFlag: '',
      item:[],
      sum: 0,
    }
  ]
  console.log(costList,'constList')
  let index = 0;
  costList.forEach((item)=> {
    let flag = new Date(item.time).getFullYear() + '年' + new Date(item.time).getMonth()+'月';
    item = {...item,sortDate:flag};
    console.log(item,'item');
    if(ret[0].dateFlag==''){
      ret[0].dateFlag = item.sortDate;
      ret[0].item.push(item);
      ret[0].sum += Number(item.cost);
    } else{
      if(ret[index].dateFlag == item.sortDate){
        ret[index].item.push(item);
        ret[index].sum += Number(item.cost);
      }else{
        index++;
        ret[index] = {
          dateFlag: '',
          item: [],
          sum: 0,
        }
        ret[index].dateFlag = item.sortDate
        ret[index].item.push(item)
        ret[index].sum += Number(item.cost);
      }
    }
  })
  console.log(ret, 'rett')
  return ret;
  
}

module.exports = { formatTime, showBusy, showSuccess, showModel, validateForm, surplus, sortList, totalCost, sortByMonth}
