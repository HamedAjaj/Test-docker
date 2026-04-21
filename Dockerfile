# FROM  node:20 as base
#  FROM base as development

# WORKDIR /app

# COPY package.json .

# # RUN npm install

# ARG NODE_ENV
# #first way in multi stage development or production
# Run npm install

# # second way to install dependencies based on the environment variable NODE_ENV
# # RUN if [ "$NODE_ENV" = "production" ]; then \
# #     npm install --only=production; \
# #     else \
# #     npm install; \
# #     fi
# COPY . .
 
# EXPOSE 3000  
# # should do port forwarding
# # any one want to access the app should use port 3000 then access the app
# #3000:3000


# CMD ["npm", "run", "dev"]
# # bind mount in docker run -p 3000:3000 -v ${PWD}:/app <image_name>
# #PS D:\Docker\test projects> docker run --name express-node-containering -v $(pwd):/app:ro -d
# # -p 3000:3000 express-node-appp


# # Ther is way called multi stage build to reduce the size of the image by using multiple stages in the Dockerfile for production and development environments. In production stage we can use a smaller base image and only copy the necessary files for running the application, while in development stage we can use a larger base image with all the dependencies and tools needed for development. This way we can optimize the size of the final image for production while still having a full-featured image for development.   
# FROM base as production
# WORKDIR /app
# COPY package.json .
# Run npm install -only=production
# COPY . .
# EXPOSE 3000
# CMD ["npm", "start"]


FROM  node:20 as base 
WORKDIR /app

COPY package.json .

# RUN npm install

ARG NODE_ENV
RUN if [ "$NODE_ENV" = "production" ]; then \
    npm install --only=production; \
    else \
    npm install; \
    fi
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]
