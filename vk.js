

show_baner = () => {
    vkBridge.send('VKWebAppShowBannerAd', {
          banner_location: 'bottom'
          })
         .then((data) => { 
            if (data.result) {
              // Баннерная реклама отобразилась
            }
          })
          .catch((error) => {
            // Ошибка
            console.log(error);
          });
}


hide_baner = () => {
  vkBridge.send('VKWebAppHideBannerAd')
  .then((data) => { 
    if (data.result) {
      // Баннерная реклама скрыта
    }
  })
  .catch((error) => {
    // Ошибка
    console.log(error);
  });
}


save_value = async (key,val) =>{
  await vkBridge.send('VKWebAppStorageSet', {
           key: key,
           value: val
          })
          .then((data) => { 
            if (data.result) {
              console.log("uspeh " + key+ " "+val)// Значение переменной задано
            }
          })
          .catch((error) => {
            // Ошибка
            console.log(error);
          });

}

get_values = async () => {
        const valuesArr = await vkBridge.send('VKWebAppStorageGet', {
          keys: [
            'count',
            'subscribe'
          ]})
          .then((data) => { 
            if (data.keys) {
              return [data.keys[0].value , data.keys[1].value ]// Значения получены
            }
          })
          .catch((error) => {
            // Ошибка
            console.log(error);
          });


        console.log(valuesArr)

        return valuesArr
}


open_pay_windows = async (user_id) => {
  open = await vkBridge.send('VKWebAppOpenPayForm', {
    app_id: 54690035,
    action: 'pay-to-service',
    params: {
      user_id: user_id,
      description: `Test Payment`,
      amount: "1"      
    }})
  .then((data) => {
    if (data.status) {
      // Экран VK Pay показан
    }
  })
  .catch((error) => {
    // Ошибка
    console.log(error);
    return error
  });
}

get_id = async () => {
  vk_user_id = await vkBridge.send('VKWebAppGetLaunchParams')
  .then((data) => { 
    if (data.vk_app_id) {
      return data.vk_user_id// Параметры запуска получены
    }
  })
  .catch((error) => {
    // Ошибка
    console.log(error);
  });
  return vk_user_id
}