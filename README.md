# Calystone

Calystone is an app that helps you organize your life through your file system, with features like note taking and task management. Learn more about its capabilities and motivation in the following sections.

The project has a strong focus on privacy and does not track or store data about you or your files. Even so, be aware of the policies for any service you choose. Read more in the [Terms of Service](docs/TERMS_OF_SERVICE.md) and the [Privacy Policy](docs/PRIVACY_POLICY.md).

Calystone is open source. You are welcome to run, copy, distribute, and study the software. More about this in the [license](/LICENSE). There is also a [development overview](/docs/DEVELOPMENT.md) that can help you understand the project and its code.

## Overview

Your personal file structure is already a curated organization system. In it, you can represent life areas and projects through directories. In those directories you can aggregate all data related to those projects independent of format.

Calystone harnesses that power by offering features around some of these files without limiting what you routinely do by demanding some special folder structure or proprietary file format. **The project imposes itself a restriction that it should connect to the user file system as-is without demanding any special structure**.

The two most relevant features are note taking and task management. The intention is to easily enable you to create and edit your text notes so you can build a knowledge base with text files. The app is able to enrich the editing experience by supporting syntaxes like [markdown](https://en.wikipedia.org/wiki/Markdown). 

The task management feature is also based on text files. To use it, you create a file with the `.todo` extension. The app will offer a interface that will enable you to input progress, priority, tags and dates, for example. This is saved as text into the todo file. 

Todos can be seen in the file structure but also in a tags outline with the todos ordered by priority. This view is composed on the fly based on the todos the app currently knows about.

The project is developed with care and is always working to improve its reliability, nevertheless, it does not provide any guarantees. It is extremely important to maintain regular backups of your files.

## Motivation

In recent decades, with the rise of SaaS and app stores, there is a move of the data placement from the file system to behind the app curtain.

Apps like Notion or Google Photos, for example, offer awesome features but the data itself is opaque to the user. I am not arguing this is unreasonable or inherently bad, but from a personal point of view I sure don't like it.

I don't like it for two reasons. First is the knowledge base point of view. If I have a project like a trip or a commercial endeavor, I will accumulate data around in a multi format way. I will create text notes, pdfs, images and spreadsheets, for example. 

File systems are an excellent abstraction of how we organize our lives. The directory structure can start very broad with main subjects like health, family and work, and you can freely drill down to categories and individual projects. The point is that this organization represents your mental model not a loosely system of labels spread through multiple apps that stand between you and your data.

In a personal project, like a trip, for example, we deal with multiple types of data, like pictures, spreadsheets, and plans. A folder can accommodate all of that so we can make a mental model of the task we are dealing with.

I want those files together, so when I need to consult or work on those endeavours, the relevant associations are closely related inside the project. The project PDF files are more related to project spreadsheets then to all other PDF I have.

The other aspect is longevity. Apps die or became inaccessible because they raise their prices or change some fundamental feature, for example. And when that happens, you can lose your data. Even if there is some kind of export, rarely this is useful without a lot of effort on the user part.

The combination of the file system and open formats like text is the ultimate remedy to this. They are the true personal database. Directories and files can be moved everywhere. We can move them to another operating system, save them in thumb drives, make backups on the cloud and control what to share or delete. 

On top of that, if our data is stored in an open format, like text files, you can pick and new app after the old one died or got to expensive and keep reading and editing without worrying.

The Calystone project embraces this philosophy and if you find this interesting, there is more like it this [post](https://web.archive.org/web/20211227173721/https://www.al3x.net/blog/2009/01/31/the-case-against-everything-buckets) or this [one](https://sive.rs/plaintext).

# Features

Like said in the beginning, the main features are around note taking and task management. But to do that, we need to get access to the file structure. Let's start by explained how to do that.

## Sources

### File System Access

You choose the file system options at the initial page and select the top root folder the app will provide its features. Everything outside the selected folder is invisible to the app.

Been a web app, it may seem odd it can access the local file system. This is enabled by a technology called the [File System Access Api](https://developer.mozilla.org/en-US/docs/Web/API/File_System_API). From the user perspective, the main point is that the browser sits between the app and the file system and makes sure to limit access and operations, which enhances security.

### About Directories

When selecting a directory in the outline, you can see some basic information about it in the right side. This can be improved by placing a README.txt or README.md file in the directory folder. The text on this file will be shown in the right side whenever you click in the directory.

### Background Loading

After the root folder is selected, the app does not start with knowledge about all folders and files under the root. This data is progressivly loaded based in you interations like expanding directories or clicking in text files.

The app also attempts to load some data in the background. It gradually opens directories to take notice of subfolders, loads the content of todo files and smaller text files. 

If using the file system access, no network is used to perform this task. Nevertheless, this can be disabled by clicking in the respective option in the loading icon in left sidebar.

### Cloud Providers

The access to files through some cloud providers is possible. This is available specially make the app useful in mobile devices, in which we usually don't have contextualized files locally. Unlike the file system case, be aware that network data is used.

It is important to understand that although the Calystone project has a strong position on privacy as stated in the project [Privacy Policy](docs/PRIVACY_POLICY.md), when using those services you will be bound to their own terms and policies regarding that. 

## Note Taking

When a text file is selected, the app will load its content and offer a text editor at the outline right side. In the top toolbar you have access to general file actions like renaming or exporting the file. Below that, the editor section brings a simple text editor where you can read and update your text. The app constantly saves your changes to the file while you update the content.

The editor offers some resources like line number and syntax highlighting. The syntax highlight is specially interesting when using [markdown syntax](https://www.markdownguide.org/basic-syntax/). This keeps the text content still detached from any special software, since markdown is supported pretty much everywhere, and helps overcome limitations around formatting and content structure that keep many users away from pure text editors.

The text editor was built using the awesome open source project [CodeMirror](https://codemirror.net/).

## Todo

You can also do task management in Calystone. To do that, you create files with the `.todo` extension. The app offers a editor with specific fields for many aspects of your task.

You can set the app progress status, use the description field to provide context and control inner steps of the task typing `- [ ]` at the start of each line. There are also fields for date and priority information about the task. 

Tasks also support tags. While loading the todos files in the current session, Calystone will gradually feed a tags page in the background. This page will show an outline with tags from the todo files it knows about. The todos of a tag will then be shown in their priority order. This is a feature you can use to aggregate the todos relevant for this week, for example.

As said before, todo files are text files. You can check that by opening any of those files in another text editor.

# Author

I hope this app can help you. It was made with ❤️ by [João Melo](http://joao.melo.plus).
