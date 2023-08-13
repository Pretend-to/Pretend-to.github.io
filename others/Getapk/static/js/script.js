// script.js

window.addEventListener('DOMContentLoaded', function() {
    var packageInfo = {
      uploadDate: '2023-08-13',
      version: '1.0.2',
      size: '912KB'
    };
  
    var infoElement = document.createElement('div');
    var dateElement = document.createElement('p');
    var daysAgo = getDaysAgo(packageInfo.uploadDate);
  
    dateElement.textContent = '上传日期：' + packageInfo.uploadDate;
    infoElement.appendChild(dateElement);
  
    var versionSizeElement = document.createElement('p');
    versionSizeElement.textContent = '版本：' + packageInfo.version + ' | 大小：' + packageInfo.size;
    infoElement.appendChild(versionSizeElement);
  
    var daysAgoElement = document.createElement('p');
    daysAgoElement.textContent = daysAgo + '天前上传';
    infoElement.appendChild(daysAgoElement);
  
    var container = document.querySelector('.container');
    container.insertBefore(infoElement, container.querySelector('.button'));
  });
  
  function getDaysAgo(dateString) {
    var today = new Date();
    var uploadDate = new Date(dateString);
    var timeDiff = Math.abs(today.getTime() - uploadDate.getTime());
    var daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return daysDiff;
  }
  