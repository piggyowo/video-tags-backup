import React, { useState, useMemo } from 'react';
import Layout from '@/components/Layout';
import { useTags } from '@/contexts/TagContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, X, Search, Hash } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function TagsPage() {
  const { tags, categories, addTag, removeTag } = useTags();
  const [newTagName, setNewTagName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(categories[0]?.id || '');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'cloud'>('grid');

  const handleAddTag = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTagName.trim() && selectedCategory) {
      addTag(newTagName.trim(), selectedCategory);
      setNewTagName('');
    }
  };

  const filteredTags = tags.filter(tag => {
    const matchesSearch = tag.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeFilter === 'all' || tag.category === activeFilter;
    return matchesSearch && matchesCategory;
  });

  // 计算标签云的大小权重
  const tagCloudData = useMemo(() => {
    const categoryFreq: Record<string, number> = {};
    filteredTags.forEach(tag => {
      categoryFreq[tag.category] = (categoryFreq[tag.category] || 0) + 1;
    });
    
    const maxFreq = Math.max(...Object.values(categoryFreq), 1);
    const minFreq = Math.min(...Object.values(categoryFreq), 1);
    
    return filteredTags.map(tag => {
      const freq = categoryFreq[tag.category];
      const size = minFreq === maxFreq ? 1 : (freq - minFreq) / (maxFreq - minFreq);
      return { ...tag, size };
    });
  }, [filteredTags]);

  const renderGridView = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <AnimatePresence mode="popLayout">
        {filteredTags.map((tag, index) => {
          const category = categories.find(c => c.id === tag.category);
          return (
            <motion.div
              key={tag.id}
              layout
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="group relative bg-card hover:shadow-md transition-all duration-200 border border-border rounded-lg p-4 flex flex-col gap-3 hover:border-primary/30"
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: category?.color || 'gray' }} />
                  {category?.name || 'Uncategorized'}
                </div>
                <button 
                  onClick={() => removeTag(tag.id)}
                  className="text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="font-semibold text-lg flex items-center gap-1 break-words">
                <Hash className="w-4 h-4 text-muted-foreground/50 flex-shrink-0" />
                <span className="line-clamp-2">{tag.name}</span>
              </div>
              <div className="text-xs text-muted-foreground mt-auto">
                {new Date(tag.createdAt).toLocaleDateString()}
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
      
      {filteredTags.length === 0 && (
        <div className="col-span-full text-center py-20 text-muted-foreground">
          没有找到匹配的标签
        </div>
      )}
    </div>
  );

  const renderCloudView = () => (
    <div className="flex flex-wrap gap-3 justify-center items-center py-12 px-4 bg-card rounded-lg border border-border">
      <AnimatePresence>
        {tagCloudData.map((tag, index) => {
          const category = categories.find(c => c.id === tag.category);
          const baseSizeClass = 'px-4 py-2 rounded-full font-medium transition-all duration-200 cursor-pointer hover:shadow-md';
          const sizeClass = tag.size < 0.33 ? 'text-sm' : tag.size < 0.66 ? 'text-base' : 'text-lg font-bold';
          
          return (
            <motion.div
              key={tag.id}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="group relative"
              whileHover={{ scale: 1.1 }}
            >
              <div 
                className={`${baseSizeClass} ${sizeClass} text-white relative overflow-hidden`}
                style={{ backgroundColor: category?.color || 'gray' }}
              >
                <span className="relative z-10 flex items-center gap-1">
                  <Hash className="w-3 h-3" />
                  {tag.name}
                </span>
                <button 
                  onClick={() => removeTag(tag.id)}
                  className="absolute right-1 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
      
      {filteredTags.length === 0 && (
        <div className="text-center text-muted-foreground py-8 w-full">
          没有找到匹配的标签
        </div>
      )}
    </div>
  );

  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">标签管理</h2>
            <p className="text-muted-foreground mt-1">管理和备份您的视频关键词</p>
          </div>
          
          <form onSubmit={handleAddTag} className="flex gap-2 w-full md:w-auto">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="选择分类" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(cat => (
                  <SelectItem key={cat.id} value={cat.id}>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: cat.color }} />
                      {cat.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input 
              placeholder="输入新标签..." 
              value={newTagName}
              onChange={(e) => setNewTagName(e.target.value)}
              className="w-full md:w-64"
            />
            <Button type="submit">
              <Plus className="w-4 h-4 mr-2" />
              添加
            </Button>
          </form>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between bg-card p-4 rounded-lg border border-border shadow-sm">
          <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 w-full sm:w-auto no-scrollbar">
            <Button 
              variant={activeFilter === 'all' ? 'default' : 'ghost'} 
              size="sm"
              onClick={() => setActiveFilter('all')}
              className="rounded-full"
            >
              全部
            </Button>
            {categories.map(cat => (
              <Button
                key={cat.id}
                variant={activeFilter === cat.id ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveFilter(cat.id)}
                className="rounded-full whitespace-nowrap"
              >
                <div className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: cat.color }} />
                {cat.name}
              </Button>
            ))}
          </div>
          
          <div className="flex gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-none sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="搜索标签..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            
            <div className="flex gap-1 bg-secondary rounded-lg p-1">
              <Button 
                variant={viewMode === 'grid' ? 'default' : 'ghost'} 
                size="sm"
                onClick={() => setViewMode('grid')}
                className="rounded"
              >
                网格
              </Button>
              <Button 
                variant={viewMode === 'cloud' ? 'default' : 'ghost'} 
                size="sm"
                onClick={() => setViewMode('cloud')}
                className="rounded"
              >
                云图
              </Button>
            </div>
          </div>
        </div>

        {viewMode === 'grid' ? renderGridView() : renderCloudView()}
      </div>
    </Layout>
  );
}
