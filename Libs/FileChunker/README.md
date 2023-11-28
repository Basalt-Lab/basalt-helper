# 🧹 WhiteSpaceRemover

## 📝 Description
`WhiteSpaceRemover` est un programme conçu pour supprimer les espaces blancs en fin de ligne dans chaque fichier.

Initialement développé pour répondre à un besoin immédiat, le code, maintenant amélioré, est plus efficace et offre encore des possibilités d'amélioration et d'extension.

Il inclut également une option pour générer une bibliothèque partagée ou statique.

*🌐 Il devrait fonctionner sur n'importe quel système.*

## 🛠️ Setup (Pour le développement)
Pour construire le programme :
```sh
mkdir build && cd build && cmake .. && make
```

### 🏗️ Options de Construction
Pour construire une bibliothèque partagée, utilisez l'option `BUILD_SHARED_LIB` :
```sh
cmake .. -DBUILD_SHARED_LIB=ON
```

Pour construire une bibliothèque statique, utilisez l'option `BUILD_STATIC_LIB` :
```sh
cmake .. -DBUILD_STATIC_LIB=ON
```

## ⬇️ Setup (Pour les utilisateurs)
Téléchargez ici : [Releases](https://github.com/Necrelox/WhiteSpaceRemover/releases)

## 🖥️ Usage
```sh
./WhiteSpaceRemover <path>
```
