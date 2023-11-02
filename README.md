# 📦 Basalt-helper

## 📌 Table of contents

- [📦 Basalt-helper](#-basalt-helper)
  - [📌 Table of contents](#-table-of-contents)
  - [📝 Description](#-description)
  - [🌟 Features](#-features)
  - [🔧 Installation](#-installation)
  - [📋 Future Plans](#-future-plans)
  - [👥 Contributing](#-contributing)
  - [⚖️ License](#-license)
  - [📧 Contact](#-contact)

## 📝 Description

**Basalt-helper** is a package offering Helpers to facilitate development.

## 🌟 Features

- `OLDBasaltDataFilter` offers a variety of data manipulation capabilities:

  - **Filtering by Keys**: Selectively filters an object's entries based on a specified set of keys, allowing for the exclusion of null or undefined values through additional options.

  - **Exclusion by Keys**: Inversely filters an object's data by excluding specified keys.

  - **Key Transformations**: Modifies the format of keys within an object, supporting transformations into:
    - Camel Case (e.g., "sampleKey")
    - Pascal Case (e.g., "SampleKey")
    - Snake Case (e.g., "sample_key")
    - Kebab Case (e.g., "sample-key")

  - **Filtering by Value**: Provides the ability to filter object entries based on a callback function, which tests each key-value pair to determine its eligibility for inclusion in the filtered result.

  - **Deep Cloning**: Creates a deep clone of a provided object, ensuring that nested objects are recursively copied rather than referenced.
  These features are designed to provide comprehensive and flexible data manipulation for object structures, enhancing control and efficiency in data handling.


- `BasaltPassword` allows for the secure hashing and verification of passwords:

  - **Secure Password Hashing**: Utilizes the Argon2, recognized for its security and efficiency, to hash passwords. This method is resistant against both GPU cracking and timing attacks, ensuring contemporary security standards.

  - **Password Verification**: Facilitates the secure comparison between plain text passwords and their hashed counterparts, preventing potential vulnerabilities from timing attacks during the verification process.

  - **Error Handling**: Employs comprehensive error handling to guard against empty password strings and various issues that may arise during the hashing or verification processes, promoting reliable and consistent performance.
  
  These features are designed to provide a secure and reliable method for password hashing and verification, ensuring that user data is protected against potential vulnerabilities.


## 🔧 Installation

```
npm i @basalt-lab/basalt-helper
```

## 👥 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

1. Fork the Project 
2. Create your Feature Branch (git checkout -b feature/AmazingFeature)
3. Commit your Changes (git commit -m 'Add some AmazingFeature')
4. Push to the Branch (git push origin feature/AmazingFeature)
5. Open a Pull Reques to stage

## ⚖️ License

  Distributed under the MIT License. See LICENSE for more information.

## 📧 Contact

Mail - [basalt-lab@proton.me](basalt-lab@proton.me)

[Project link](https://github.com/Basalt-Lab/basalt-socket)
