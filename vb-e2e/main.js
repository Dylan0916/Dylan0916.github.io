const albumBucketName = 'dylan-image';
const bucketRegion = 'asia-pacific';
const IdentityPoolId = 'ap-northeast-1:62de6df6-994e-4e88-b675-88a09b005717';

const albumName = 'E2E';
const albumNameKey = `${albumName}/`;

const getHtml = template => template.join('\n');

AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId,
});
AWS.config.region = 'ap-northeast-1'; // 区域

const s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  params: { Bucket: albumBucketName },
});

const viewAlbum = () => {
  s3.listObjects({ Prefix: albumNameKey }, function(err, data) {
    if (err) {
      return console.log('There was an error viewing your album:', err.message);
    }

    const { href } = this.request.httpRequest.endpoint;
    const bucketUrl = `${href + albumBucketName}/`;
    const photos = data.Contents.map(photo => {
      if (photo.Size === 0) return;

      const photoKey = photo.Key;
      const photoUrl = bucketUrl + encodeURIComponent(photoKey);

      return `
        <a href="${photoUrl}" class="img-container" target="_blank">
          <img class="img-container__img" src="${photoUrl}"/>
        </a>
      `;
    });

    const htmlTemplate = `
      <h1>Album: ${albumName}</h1>
      <div class="album-wrapper">${
        photos.length <= 1
          ? 'You do not have any photos in this album. Please add photos.'
          : getHtml(photos)
      }</div>
    `;

    document.getElementById('app').innerHTML = htmlTemplate;
  });
};
