"use client"

import { ArrowDownIcon, ArrowUpIcon, ArrowUpDownIcon } from "lucide-react"
import { useTable, type ColumnDef, type RowData, type TableFeatures, type TableOptions } from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { COLUMN_FILTER_ALL, ColumnFilterButton } from "@/components/ui/column-filter-button"
import { cn } from "@/lib/utils"

export type DataTableColumnMeta = {
  filterOptions?: { value: string; label: string }[]
}

/**
 * DataTable is generic over any TFeatures, but sort/filter header controls only
 * render for columns whose table actually registered those features. Since a
 * fully generic TFeatures can't statically guarantee that, this narrows the
 * column shape for the optional methods at the point of use.
 */
type SortableFilterableColumn = {
  getCanSort: () => boolean
  getIsSorted: () => false | "asc" | "desc"
  getToggleSortingHandler: () => undefined | ((event: unknown) => void)
  getFilterValue: () => unknown
  setFilterValue: (updater: unknown) => void
  columnDef: { meta?: DataTableColumnMeta }
}

interface DataTableProps<TFeatures extends TableFeatures, TData extends RowData> {
  features: TFeatures
  columns: ColumnDef<TFeatures, TData>[]
  data: TData[]
  altRows?: boolean
  emptyMessage?: string
  onRowClick?: (row: TData) => void
}

export function DataTable<TFeatures extends TableFeatures, TData extends RowData>({
  features,
  columns,
  data,
  altRows = false,
  emptyMessage = "No results.",
  onRowClick,
}: DataTableProps<TFeatures, TData>) {
  const table = useTable({
    features,
    data,
    columns,
  } as unknown as TableOptions<TFeatures, TData>)

  return (
    <div className="surface-card flex h-full min-h-0 flex-col overflow-hidden">
      <div className="min-h-0 flex-1 overflow-y-auto">
        <Table>
          <TableHeader className="sticky top-0 z-10 bg-muted/95 backdrop-blur-sm">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  if (header.isPlaceholder) {
                    return <TableHead key={header.id} />
                  }

                  const column = header.column as unknown as SortableFilterableColumn
                  const canSort = column.getCanSort()
                  const sortDirection = column.getIsSorted()
                  const filterOptions = column.columnDef.meta?.filterOptions

                  return (
                    <TableHead
                      key={header.id}
                      className="h-12 text-sm font-semibold text-foreground tracking-tight"
                    >
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          disabled={!canSort}
                          onClick={column.getToggleSortingHandler()}
                          className={cn(
                            "flex items-center gap-1 text-left",
                            canSort && "cursor-pointer hover:text-primary"
                          )}
                        >
                          <table.FlexRender header={header} />
                          {canSort &&
                            (sortDirection === "asc" ? (
                              <ArrowUpIcon className="size-3.5" />
                            ) : sortDirection === "desc" ? (
                              <ArrowDownIcon className="size-3.5" />
                            ) : (
                              <ArrowUpDownIcon className="size-3.5 opacity-40" />
                            ))}
                        </button>
                        {filterOptions && (
                          <ColumnFilterButton
                            value={(column.getFilterValue() as string | undefined) ?? COLUMN_FILTER_ALL}
                            onChange={(value) =>
                              column.setFilterValue(value === COLUMN_FILTER_ALL ? undefined : value)
                            }
                            options={filterOptions}
                          />
                        )}
                      </div>
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row, index) => (
                <TableRow
                  key={row.id}
                  onClick={() => onRowClick?.(row.original)}
                  className={cn(
                    altRows && index % 2 !== 0 && "bg-muted/40",
                    onRowClick && "cursor-pointer"
                  )}
                >
                  {row.getAllCells().map((cell) => (
                    <TableCell key={cell.id}>
                      <table.FlexRender cell={cell} />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center text-muted-foreground">
                  {emptyMessage}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
