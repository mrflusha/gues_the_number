getServerTime = async () => {
  try {
    // Отправляем запрос на свой сервер (или любой публичный API)
    const response = await fetch(window.location.href, { method: 'HEAD' });
    
    // Достаем строку даты из заголовков
    const serverDateStr = response.headers.get('date'); 
    
    // Конвертируем в объект даты JS
    const serverDate = new Date(serverDateStr);
    
    console.log("Точное время сервера:", serverDate);
    return serverDate;
  } catch (error) {
    console.error("Ошибка получения времени:", error);
    return new Date(); // Фолбэк на локальное время в случае сбоя
  }
}


passed7Days =  (timeExpirience) =>  {
  const date = timeExpirience;
  date.setDate(date.getDate() + 3);
  return date;
}

passed3Days =  (timeExpirience) =>  {
  const date = timeExpirience;
  date.setDate(date.getDate() + 3);
  return date;
}

passed24Hours =  (timeExpirience) =>  {
  const date = timeExpirience;
  date.setDate(date.getDate() + 1);
  return date;
}


getDaysUntilSubscriptionEnds = async (expiryDate) => {
  const now = await getServerTime();
  const expiry = new Date(expiryDate);
  
  if (expiry <= now) {
    return { days: 0, hours: 0, minutes: 0 };
  }
  
  // Количество миллисекунд в единицах времени
  const msInMinute = 60 * 1000;
  const msInHour = 60 * msInMinute;
  const msInDay = 24 * msInHour;
  
  // Общая разница в миллисекундах
  const diffMs = expiry - now;
  
  // Считаем целые компоненты времени
  const days = Math.floor(diffMs / msInDay);
  const hours = Math.floor((diffMs % msInDay) / msInHour);
  const minutes = Math.floor((diffMs % msInHour) / msInMinute);
  
  return { days, hours, minutes };
}
