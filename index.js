fetch('https://api.apify.com/v2/datasets/1W3B2jxQ97xrcYr1e/items?token=apify_api_ny9dFQDS5Axnek9GSw4yDidu4e4VjN2GsH5F')
            .then(res=>res.json())
            .then(json=>console.log(json))