//
// Created by ruby on 28/11/2023.
//

#ifndef FILECHUNKER_FILECHUNKER_HPP
#define FILECHUNKER_FILECHUNKER_HPP

#include "RandomSplitStrategy.hpp"
#include "RandomBuildStrategy.hpp"

#include <memory>

class FileChunker {
private:
    std::unique_ptr<ISplitStrategy> _splitStrategy;
    std::unique_ptr<IBuildStrategy> _buildStrategy;
public:
    FileChunker(std::unique_ptr<ISplitStrategy> splitStrategy, std::unique_ptr<IBuildStrategy> buildStrategy) :
            _splitStrategy(std::move(splitStrategy)), _buildStrategy(std::move(buildStrategy)) {}

    FileChunker() :
            _splitStrategy(std::make_unique<RandomSplitStrategy>()),
            _buildStrategy(std::make_unique<RandomBuildStrategy>()) {}

};

#endif //FILECHUNKER_FILECHUNKER_HPP
