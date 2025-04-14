<table>
    <thead>
    <tr>
        <th>Invoice ID</th>
        <th>Code</th>
        <th>Total Price</th>
        <th>PIC Name</th>
        <th>Created At</th>
    </tr>
    </thead>
    <tbody>
    @foreach($invoices as $invoice)
        <tr>
            <td>{{ $invoice->id }}</td>
            <td>{{ $invoice->code }}</td>
            <td>{{ $invoice->total_price }}</td>
            <td>{{ $invoice->user->name }}</td>
            <td>{{ $invoice->created_at }}</td>
        </tr>
    @endforeach
    </tbody>
</table>