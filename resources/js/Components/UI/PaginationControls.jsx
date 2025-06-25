import React from 'react';
import Button from "@/Components/UI/Button/Button";

export default function PaginationControls({
  records,
  filter,
  onPerPageChange,
  onPageChange,
  t
}) {
    
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 px-4 py-4 bg-white dark:bg-boxdark border-t border-stroke dark:border-strokedark">
      {/* Records per page selector */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-bodydark2 dark:text-bodydark">{t('general.show', { default: 'Show' })}</span>
        <select
          value={filter.per_page}
          onChange={(e) => onPerPageChange(parseInt(e.target.value))}
          className="px-3 py-1.5 text-sm border border-stroke dark:border-strokedark rounded-md bg-white dark:bg-boxdark text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          <option value={20}>20</option>
          <option value={30}>30</option>
          <option value={40}>40</option>
          <option value={50}>50</option>
        </select>
        <span className="text-sm text-bodydark2 dark:text-bodydark">{t('general.entries_per_page', { default: 'entries per page' })}</span>
      </div>

      {/* Record count display */}
      <div className="text-sm text-bodydark2 dark:text-bodydark">
        {t('general.showing_records', {
          from: records.from || 0,
          total: records.total || 0,
          to: records.to || 0,
          default: `Showing ${records.from || 0} to ${records.to || 0} of ${records.total || 0} entries`
        })}
      </div>

      {/* Pagination navigation */}
      <div className="flex items-center gap-2">
        {records.links.map((link, index) => (
          <Button
            key={index}
            size="sm"
            variant={link.active ? "primary" : "outline"}
            disabled={!link.url}
            onClick={() => link.url && onPageChange(link.url)}
            className={`${link.active ? 'bg-primary text-white' : ''} ${!link.url ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <span dangerouslySetInnerHTML={{ __html: link.label }} />
          </Button>
        ))}
      </div>
    </div>
  );
}