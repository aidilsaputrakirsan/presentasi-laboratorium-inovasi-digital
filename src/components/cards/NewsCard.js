// src/components/cards/NewsCard.js
import React from 'react';
import { FileText, Eye, ExternalLink } from 'lucide-react';

const NewsCard = ({ article, onClick }) => (
  <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300 cursor-pointer" onClick={() => onClick(article)}>
    <div className="flex justify-between items-start mb-3">
      <h3 className="font-bold text-gray-800 flex-1 mr-2 line-clamp-2">{article.title}</h3>
      <span className="px-2 py-1 bg-pink-100 text-pink-800 rounded-full text-xs font-medium">
        {article.category}
      </span>
    </div>

    <div className="mb-3">
      <p className="text-sm text-gray-600">{article.author} • {new Date(article.date).toLocaleDateString('id-ID')}</p>
      <p className="text-xs text-gray-500">{article.readTime} • {article.views} views</p>
    </div>

    <p className="text-sm text-gray-700 mb-4 line-clamp-3">{article.excerpt}</p>

    <div className="flex flex-wrap gap-1 mb-4">
      {article.tags.slice(0, 3).map((tag, i) => (
        <span key={i} className="px-2 py-1 bg-gray-50 text-gray-600 rounded text-xs">{tag}</span>
      ))}
    </div>

    <div className="flex justify-between items-center">
      <button className="text-pink-600 hover:text-pink-800 text-sm font-medium flex items-center">
        <FileText className="h-4 w-4 mr-1" />
        Baca Selengkapnya
      </button>
      <div className="flex space-x-2">
        <button className="p-1 hover:bg-gray-100 rounded">
          <Eye className="h-4 w-4 text-gray-500" />
        </button>
        <button className="p-1 hover:bg-gray-100 rounded">
          <ExternalLink className="h-4 w-4 text-gray-500" />
        </button>
      </div>
    </div>
  </div>
);

export default NewsCard;