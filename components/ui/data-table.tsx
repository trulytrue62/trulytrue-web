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
import { TABLE_FILTER_ALL, TableFilterSelect } from "@/components/ui/table-filter-select"
import { cn } from "@/lib/utils"

export type DataTableColumnMeta = {
  filterOptions?: { value: string; label: string }[]
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
          <TableHeader className="sticky top-0 z-10 bg-muted/95 text-xs backdrop-blur-sm">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  if (header.isPlaceholder) {
                    return <TableHead key={header.id} />
                  }

                  const canSort = header.column.getCanSort()
                  const sortDirection = header.column.getIsSorted()
                  const filterOptions = header.column.columnDef.meta?.filterOptions

                  return (
                    <TableHead key={header.id} className="align-top text-muted-foreground tracking-tight">
                      <div className="flex flex-col gap-1.5 py-1">
                        <button
                          type="button"
                          disabled={!canSort}
                          onClick={header.column.getToggleSortingHandler()}
                          className={cn(
                            "flex items-center gap-1 text-left",
                            canSort && "cursor-pointer hover:text-foreground"
                          )}
                        >
                          <table.FlexRender header={header} />
                          {canSort &&
                            (sortDirection === "asc" ? (
                              <ArrowUpIcon className="size-3" />
                            ) : sortDirection === "desc" ? (
                              <ArrowDownIcon className="size-3" />
                            ) : (
                              <ArrowUpDownIcon className="size-3 opacity-40" />
                            ))}
                        </button>
                        {filterOptions && (
                          <TableFilterSelect
                            value={(header.column.getFilterValue() as string | undefined) ?? TABLE_FILTER_ALL}
                            onChange={(value) =>
                              header.column.setFilterValue(value === TABLE_FILTER_ALL ? undefined : value)
                            }
                            label="All"
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
