FROM node:18-alpine AS build

WORKDIR /app

# העתק את קובצי התלויות
COPY apps/y-system-client/package.json ./
COPY package-lock.json ./

# התקנת חבילות
RUN npm install

# העתקת הקוד
COPY apps/y-system-client ./

# בניית הפרויקט
RUN npm run build

# שלב ה-Nginx
FROM nginx:alpine

# מחיקת קובץ ברירת המחדל של Nginx
RUN rm /etc/nginx/conf.d/default.conf

# העתקת קובץ ה-Nginx
COPY apps/y-system-client/nginx.conf /etc/nginx/conf.d/default.conf

# העתקת ה-build ממיקומו האמיתי
COPY --from=build /app/dist /dist

EXPOSE 5173

CMD ["nginx", "-g", "daemon off;"]
