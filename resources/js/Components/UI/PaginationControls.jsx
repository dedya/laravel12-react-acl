import React from 'react';
import Button from "@/Components/UI/Button/Button";

export default function PaginationControls({
    records,
    filter,
    onPerPageChange,
    onPageChange,
    t,
    perPageOptions = [10, 20, 50, 100],
}) {
    
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 px-4 py-4 bg-white border-t border-stroke dark:border-white/[0.01] dark:bg-white/[0.01]">

    {/* Records per page selector */}
    {(() => {        
        return (
          <div className="flex items-center gap-2">
            <span className="text-sm text-bodydark2 dark:text-gray-400">{t('general.show', { default: 'Show' })}</span>
            <select
              value={filter.per_page}
              onChange={(e) => onPerPageChange(parseInt(e.target.value))}
              className="px-3 py-1.5 text-sm border border-stroke dark:border-strokedark rounded-md bg-white dark:bg-boxdark text-black dark:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              {perPageOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            <span className="text-sm text-bodydark2 dark:text-gray-400">{t('general.entries_per_page', { default: 'entries per page' })}</span>
          </div>
        );
    })()}
    <div className="text-sm text-bodydark2 dark:text-gray-400">
      {t('general.showing_records', {
        from: records.from || 0,
        total: records.total || 0,
        to: records.to || 0,
        default: `Showing ${records.from || 0} to ${records.to || 0} of ${records.total || 0} entries`
      })}
    </div>
      <div className="flex items-center gap-2">
        {records.links.map((link, index) => {
            let label = link.label;

            // Translate known labels
            if (label.toLowerCase().includes('previous')) {
                label = t('pagination.previous', { default: 'Previous' });
            } else if (label.toLowerCase().includes('next')) {
                label = t('pagination.next', { default: 'Next' });
            } 
            // Render other pages as buttons
            return (
                <Button
                key={index}
                size="sm"
                variant={link.active ? "primary" : "outline"}
                disabled={!link.url}
                onClick={() => link.url && onPageChange(link.url)}
                className={`${!link.url ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
               <span dangerouslySetInnerHTML={{ __html: label }} />
                </Button>
            );
        })}
      </div>
    </div>
  );
}