
User is going to submit the form with an image file and a title
    - POST /image title, image file
        - Validate the image file
        - Store the image file in AWS -> aws-sdk -> new thing, how do we do this?
        - Save to Database (file storage):
            - image file storage location
                - use this on front end to use in our <img src={aws image src goes here}>
            - image title (metadata)
        - Respond with status -> did this successfully get created?


Gallery
    - GET /gallery
        - Retrieves all the image metadata from the server & the image file from S3
```
    [
        {
            id: 1,
            image_src: "http://aws.com/image-1.jpg",
            title: "First Image"
        },
        {
            id: 2,
            image_src: "http://aws.com/image-2.jpg",
            title: "Second Image"
        }, 
    ]
```


- Since we're sending the file directly to AWS, why do we need our own server?
    - We want to hide our AWS credentials

- How to store the image file in AWS?
    - send request to server to create a signed-url that we can send the image file directly to S3 with from the client side
    - Once that is successful, send request to server to save image source and title to database