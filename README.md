# Description
This is a simple, modular server dashboard I made for my NAS. You can add as many as you'd like in the "modules" folder, along with server-side API for them.

**Please note that this is a personal project, and may not be production-ready. If you run into issues, feel free to drop an issue on this repo.**

# Screenshots
![Screenshot #1](https://i.postimg.cc/xdyJcvRc/image.png)
![Screenshot #2](https://i.postimg.cc/wMP3S06b/image.png)

# Installing
Note: This is my first dockerfile of my own, so it's likely not perfect.

First start by either cloning the entire repo, or just downloading the `Dockerfile` and `docker-compose.yml` files. They're all that's necessary for setup.

Then run `docker compose up --build`

Then, you can copy the files inside of src/config to the config directory in your docker project, and start editing your own configs.

Optionally, you can create your own JSX modules inside the modules folder. Feel free to look in src/Components/Modules for examples. You can also create your own backend APIs, though there is currently no way to install your own NPM packages. If you know of an elegant solution, please create an issue or PR.