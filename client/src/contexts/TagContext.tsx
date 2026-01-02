import React, { createContext, useContext, useEffect, useState } from 'react';
import { nanoid } from 'nanoid';

export interface Tag {
  id: string;
  name: string;
  category: string;
  createdAt: number;
}

export interface Category {
  id: string;
  name: string;
  color: string;
}

interface TagContextType {
  tags: Tag[];
  categories: Category[];
  addTag: (name: string, categoryId: string) => void;
  removeTag: (id: string) => void;
  addCategory: (name: string, color: string) => void;
  removeCategory: (id: string) => void;
}

const TagContext = createContext<TagContextType | undefined>(undefined);

const DEFAULT_CATEGORIES: Category[] = [
  { id: 'cat_1', name: 'Vlog', color: 'var(--chart-1)' },
  { id: 'cat_2', name: 'Tech', color: 'var(--chart-2)' },
  { id: 'cat_3', name: 'Gaming', color: 'var(--chart-3)' },
  { id: 'cat_4', name: 'Tutorial', color: 'var(--chart-4)' },
  { id: 'cat_5', name: 'Music', color: 'var(--chart-5)' },
];

const DEFAULT_TAGS: Tag[] = [
  { id: 'tag_1', name: 'Daily Life', category: 'cat_1', createdAt: Date.now() },
  { id: 'tag_2', name: 'Travel', category: 'cat_1', createdAt: Date.now() },
  { id: 'tag_3', name: 'Review', category: 'cat_2', createdAt: Date.now() },
  { id: 'tag_4', name: 'Coding', category: 'cat_2', createdAt: Date.now() },
  { id: 'tag_5', name: 'Minecraft', category: 'cat_3', createdAt: Date.now() },
];

export function TagProvider({ children }: { children: React.ReactNode }) {
  const [tags, setTags] = useState<Tag[]>(() => {
    const saved = localStorage.getItem('video_tags');
    return saved ? JSON.parse(saved) : DEFAULT_TAGS;
  });

  const [categories, setCategories] = useState<Category[]>(() => {
    const saved = localStorage.getItem('video_categories');
    return saved ? JSON.parse(saved) : DEFAULT_CATEGORIES;
  });

  useEffect(() => {
    localStorage.setItem('video_tags', JSON.stringify(tags));
  }, [tags]);

  useEffect(() => {
    localStorage.setItem('video_categories', JSON.stringify(categories));
  }, [categories]);

  const addTag = (name: string, categoryId: string) => {
    const newTag: Tag = {
      id: nanoid(),
      name,
      category: categoryId,
      createdAt: Date.now(),
    };
    setTags(prev => [newTag, ...prev]);
  };

  const removeTag = (id: string) => {
    setTags(prev => prev.filter(tag => tag.id !== id));
  };

  const addCategory = (name: string, color: string) => {
    const newCategory: Category = {
      id: nanoid(),
      name,
      color,
    };
    setCategories(prev => [...prev, newCategory]);
  };

  const removeCategory = (id: string) => {
    setCategories(prev => prev.filter(c => c.id !== id));
    // Optionally remove tags in this category or move them to 'Uncategorized'
    // For simplicity, we'll keep them but they won't show up in category filters effectively
  };

  return (
    <TagContext.Provider value={{ tags, categories, addTag, removeTag, addCategory, removeCategory }}>
      {children}
    </TagContext.Provider>
  );
}

export function useTags() {
  const context = useContext(TagContext);
  if (context === undefined) {
    throw new Error('useTags must be used within a TagProvider');
  }
  return context;
}
