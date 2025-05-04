# Calystone

Calystone helps you organize your life through your file system, offering note taking and task management features. Learn more about its capabilities and motivation in the following sections.

The project prioritizes privacy. It does not track or store data about you or your files. That said, always review the privacy policies of any services you connect. Read more in the [Privacy Policy](docs/PRIVACY_POLICY.md).

Calystone is open source. You are welcome to run, copy, distribute, and study the software. More about this in the [license](/LICENSE). There is also a [development overview](/docs/DEVELOPMENT.md) that can help you understand the project and its code.

The project is developed with care and always strives to improve its reliability, nevertheless, it does not provide any guarantees. Read more in the [Terms of Service](docs/TERMS_OF_SERVICE.md) and always maintain regular backups of your files.

## Overview

Our personal file systems are already a curated organization structure. We can represent areas of life and projects using directories, and within them, aggregate all relevant information.

Calystone harnesses that power by offering features around some of these files without limiting what you routinely do by demanding some special folder structure or use of a proprietary file format. **The project imposes itself a restriction that it should connect to the user file system as-is**.

The two most relevant features are note taking and task management. The goal is to let you create and read text notes so that your file system becomes a knowledge base. It enhances the editing experience by supporting formats like [markdown](https://en.wikipedia.org/wiki/Markdown). 

Secondly, the task management feature is activated when you create a file with the `.todo` extension. These files have a special editor that enables tracking of progress, priority, tags, and dates, for example. Todo files appear within your folder structure and are also organized by priority in a tag-based outline.

## Motivation

In recent decades, with the rise of SaaS and app stores, there is a move of the data placement from the file system to behind the app curtain.

Apps like Notion or Google Photos offer powerful features — but your data often becomes opaque and tightly coupled to the app. I am not arguing this is unreasonable or inherently bad, but from a personal point of view I sure don't like it.

I don't like it for two reasons. First is the expectation of a central knowledge base. If we have a project like a trip or a commercial enterprise, we will accumulate data around it in multiple formats like text notes, pdfs, images and spreadsheets, for example. 

For such endeavors, file systems offer an excellent abstraction to organize our digital lives. The directory structure can start very broad with main subjects like health, family and work, and you can freely drill down to categories and individual projects like that trip we were talking about. This organization represents our individual mental models much better than data spread in multiple apps, each one with its own form of organization.

A project’s PDF is more closely related to its spreadsheets and images than to unrelated PDFs elsewhere.

The second aspect is longevity. Apps can shut down or become inaccessible, perhaps due to rising prices or the removal of essential features. When that happens, our data can be lost. Even when export options exist, they are rarely useful without significant effort on the user's part.

The combination of the file system and open formats like text is the ultimate remedy to this. They are your real personal database. Directories and files can be moved everywhere. We can change to another operating system, save our files in thumb drives, make backups on the cloud and control what to share or delete. 

Moreover, if your data is stored in an open format like text files, you can switch to a new app without concern when the old one is no longer available.

The Calystone project embraces this philosophy. If you find this interesting, there is more like it posts like [this](https://web.archive.org/web/20211227173721/https://www.al3x.net/blog/2009/01/31/the-case-against-everything-buckets) or [this](https://sive.rs/plaintext).

# Features

As mentioned in the beginning, the main features are around note taking and task management. But to do that, we need to get access to the file structure. Let's start by explaining how to do that.

## Sources

### File System Access

You can choose the file system at the initial page. Depending on the source you want to work with, there will be a prompt to select the top root folder the app will provide its features. Everything outside the selected folder is invisible to the app.

Being a web app, it might seem odd that it can access the local file system. If you are curious, this is enabled by a technology called the [File System Access Api](https://developer.mozilla.org/en-US/docs/Web/API/File_System_API). One of the benefits of this is that the browser will sit between the app and the user files, enhancing security.

### About Directories

After the file system is open, the directories and their files will be shown in an outline view on the left side. When a directory is selected, we can see some basic information about it in the editor view at the right side. This can be improved by placing a README.txt or README.md file in any folder. The text of this file will be shown in the directory editor alongside the basic data.

### Background Loading

After the root folder is open, the app does not start with knowledge about all folders and files inside it. This data is progressively loaded through interactions like expanding directories or clicking on text files.

The app also tries to load some of this data in the background. It gradually opens directories to take notice of subfolders, loads the content of todo files and small text files. 

If using the file system access, no network is used to perform this task. You can disable this feature by clicking the loading icon in the left sidebar.

### Cloud Providers

Calystone also supports access through certain cloud providers, mainly to enhance usability on mobile devices. We usually don't have contextualized files locally in these devices. Unlike when navigating through our files using the file system directly, be aware that network data is used when accessing files through these services, and performance or privacy may depend on the provider.

It’s also important to understand that although the project has a strong position on [privacy](docs/PRIVACY_POLICY.md), when using those services you will be bound to their own terms and policies regarding that.

## Note Taking

When a text file is selected, the app will load its content and offer a text editor at the right side. In the editor's toolbar at the top, you have access to general file actions like renaming or exporting the file. Below that, there is a minimal text editor where you can read and update your text. The app constantly saves your changes to the file while you update the content.

The editor offers some resources like line numbering and syntax highlighting. The syntax highlight is specially interesting when using [markdown syntax](https://www.markdownguide.org/basic-syntax/). This keeps the text content still detached from any special software, since markdown is supported pretty much everywhere, and helps overcome limitations around formatting and content structure that keep many users away from pure text editors.

This feature was built using the awesome open source project [CodeMirror](https://codemirror.net/).

## Task Management

We can also do task management in Calystone by creating files with the `.todo` extension. When you select a file with that extension, the app offers a editor with specific fields for the many aspects of your task.

You can use the description field to provide context and control inner steps of the task by adding `- [ ]` at the start of each line. There are also fields for progress, dates, tags and priority information about the task.

Regarding tags, while loading the todos files in the current session, Calystone will gradually feed a global view about all todos and tags. The tags page can show an outline with all known tags and their respective todo files. The todos of a tag are ordered by their priority. This feature can be used to aggregate the relevant todos for this week, for example.

Todo files are text files and data inside them is stored using standard format called JSON. You can check this out by opening a todo file in a text editor of your choice.

# Author

I hope this app can help you. It was made with ❤️ by [João Melo](http://joao.melo.plus).
