function downloadImages(urls) {
  const maxSimultaneousDownloads = 3;
  let activeDownloads = 0;
  let currentIndex = 0;

  return new Promise((resolve) => {
    const downloadNextImage = () => {
      if (currentIndex >= urls.length) {
        if (activeDownloads === 0) {
          resolve();
        }
        return;
      }

      if (activeDownloads < maxSimultaneousDownloads) {
        activeDownloads++;
        const url = urls[currentIndex];
        currentIndex++;

        // Replace this with your actual image download function
        downloadImage(url).then(() => {
          activeDownloads--;
          downloadNextImage();
        });

        downloadNextImage();
      }
    };

    downloadNextImage();
  });
}

const urls = [
    'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202004%2F07%2F20200407145005_qjmmm.thumb.1000_0.jpg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1681653538&t=0ef4aa198f8b9f6dcfb07386e2454d1f',
    'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202006%2F22%2F20200622194002_2HEzP.thumb.1000_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1681653582&t=96522ae31193f999c13719e07328aa00',
    'https://img2.baidu.com/it/u=665256831,1687931716&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=1082',
    'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202005%2F01%2F20200501143113_xldtf.png&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1681653623&t=5ebdda315ba660d3a22291e5a1732f1b',
    'https://img1.baidu.com/it/u=1249727584,242395142&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=876',
    'https://c-ssl.duitang.com/uploads/item/202004/24/20200424190848_hniwg.jpg',
    'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202005%2F01%2F20200501143118_lochl.png&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1681653690&t=0888ba2c21a14e37101a4f19e0a2ea21',
    'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202005%2F27%2F20200527072128_WrKLP.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1681653724&t=d6aaec0fabafe896ab805ab6bbc43661'
]

downloadImages(urls).then(res => {
    console.log('res', res)
})