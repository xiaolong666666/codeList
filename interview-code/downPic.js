const downLoadImage = (t) => new Promise(resolve => setTimeout(resolve, t, t))

const urls = [1000, 2000, 3000, 4000, 5000]

/*
const promisePool = (urls, handle, limit) => {
  let activeDownloads = 0;
  let currentIndex = 0;

  return new Promise((resolve) => {
    const result = []
    const downloadNextImage = () => {
      const idx = currentIndex
      if (currentIndex >= urls.length) {
        if (activeDownloads === 0) {
          resolve(result);
        }
        return;
      }

      if (activeDownloads < limit) {
        activeDownloads++;
        const url = urls[currentIndex];
        currentIndex++;

        handle(url).then((res) => {
          const now = Date.now()
          console.log(res, now - pre)
          result[idx] = res;
          activeDownloads--;
          downloadNextImage();
        });

        downloadNextImage();
      }
    };

    downloadNextImage();
  });
}
*/

// /*
const promisePool = async (urls, handle, limit) => {
  const currentTasks = new Set()
  const result = []
  for (const i in urls) {
    if (currentTasks.size >= limit) {
      await Promise.race(currentTasks)
    }
    const p = handle(urls[i])
    currentTasks.add(p)
    p.then(res => {
      const now = Date.now()
      console.log(res, now - pre)
      result[i] = res
      currentTasks.delete(p)
    })
  }
  await Promise.allSettled(currentTasks)
  return result
}
// */

/*
const promisePool = async (urls, handle, limit) => {
  const reuslt = []
  await Promise.allSettled([...new Array(limit)].map(async () => {
    while (urls.length) {
      const res = await handle(urls.shift())
      const now = Date.now()
      console.log(res, now - pre)
      reuslt.push(res)
    }
  }))
  return reuslt
}
*/

const pre = Date.now()
promisePool(urls, downLoadImage, 3).then(res => {
  console.log('res', res)
})